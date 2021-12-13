import express from "express";
import Joi from "joi";
import { getConnection } from "typeorm";
import { mustAdminAuthenticated } from "../../../helpers/auth";
import Returner from "../../../helpers/Returner";
import UserModel from "../../../models/User";
import parseFeed from "../../../helpers/parseFeed";
import PodcastModel from "../../../models/Podcast";
import EpisodeModel from "../../../models/Episode";
import timeExpressionToNumber from "../../../helpers/timeExpressionToNumber";

const router = express.Router()

router.get('/users', mustAdminAuthenticated, async () => {
    const users = await getConnection().getRepository(UserModel).find()
    Returner.json(
        users.map(u => {
            const {
                id,
                username,
                is_admin
            } = u
            return {id, username, is_admin}
        })
    )
})

router.get('/podcasts', mustAdminAuthenticated, async () => {
    const podcasts = await getConnection().getRepository(PodcastModel).find({
        relations: ['episodes']
    })
    Returner.json(
        podcasts.map(p => {
            const {
                feed,
                homepage,
                icon,
                id,
                title,
                episodes
            } = p
            return {feed, homepage, icon, id, title, episodes}
        })
    )
})

router.get('/create-user', mustAdminAuthenticated, async (req, res) => {
    const { error, value } = Joi.object({
        username: Joi.string().regex(/[a-zA-Z0-9]*/).required(),
        password: Joi.string().min(8).required()
    }).validate(req.query)
    if (error) {
        Returner.badRequest(error.message)
    }
    const userRepo = await getConnection().getRepository(UserModel)
    const user = new UserModel()
    user.username = value.username
    user.password = value.password
    await userRepo.insert(user)
    const {
        id,
        username
    } = user
    Returner.json({id, username})
})

router.get('/create-feed', mustAdminAuthenticated, async (req, res) => {
    const { error, value } = Joi.object({
        url: Joi.string().required()
    }).unknown(true).validate(req.query)
    if (error) {
        Returner.badRequest(error.message)
    }
    const { url } = value
    const feed = await parseFeed(url)
    if (feed === null) return;

    let pod = new PodcastModel()
    pod.title = feed.title
    pod.feed = url
    pod.homepage = Array.isArray(feed.link) ? feed.link[0] : feed.link
    pod.icon = feed.image
    await getConnection().getRepository(PodcastModel).upsert(pod, {conflictPaths: ['feed']})
    pod = await getConnection().getRepository(PodcastModel).findOneOrFail({where: {
        feed: url
    }})
    console.log(pod.id)
    for (const ep of feed.items) {
        const { error, value } = Joi.object({
            title: Joi.string(),
            description: Joi.string().default(""),
            link: Joi.string(),
            published: Joi.number().integer(),
            itunes_duration: Joi.string(),
            itunes_image: Joi.string()
        }).unknown(true).validate(ep)
        if (error) {
            console.log(error)
            continue
        }
        const {
            title,
            description,
            link,
            published,
            itunes_duration,
            itunes_image,
            enclosures
        } = value
        if (!Array.isArray(enclosures)) {
            console.log(`'${title}' does not provide audio, so it's not a podcast`)
            continue
        }
        const valid_enclosures = enclosures.filter(e => typeof e.url === 'string')
        if (valid_enclosures.length == 0) {
            console.log(`'${title}' does not provide audio, so it's not a podcast`)
            continue
        }
        let epdb = new EpisodeModel()
        epdb.title = title
        epdb.description = description
        epdb.pubDate = new Date(published)
        epdb.url = link
        epdb.duration = timeExpressionToNumber(itunes_duration)
        epdb.description = description
        epdb.mp3url = valid_enclosures[0].url
        epdb.podcast = pod
        epdb.guid = link
        const v = await getConnection().getRepository(EpisodeModel).upsert(epdb, {conflictPaths: ['guid']})
    }
    Returner.json({
        feed
    })
})

export default router
import express from "express";
import Joi from "joi";
import { getConnection, RelationCount } from "typeorm";
import { mustAuthenticated } from "../../helpers/auth";
import Returner from "../../helpers/Returner";
import ListenedModel from "../../models/Listened";
import { handleJWT } from "../../helpers/auth";
import EpisodeModel from "../../models/Episode";
import UserModel from "../../models/User";

const router = express.Router()

router.get("/episode", async (req, res) => {
    const {value, error} = Joi.object({
        jwt: Joi.string()
    }).unknown(true).validate(req.query)
    if (error) throw error
    const { jwt } = value 
    const auth = handleJWT<{id: number, username: string}>(jwt)
    const data = await getConnection().getRepository(ListenedModel).find({
        where: {
            user: auth.id
        },
        order: {
            lastActivity: 'DESC'
        }
    })
    Returner.json(await Promise.all(data.map(async (e) => {
        const {
            episode,
            id,
            isListened,
            lastActivity,
            position
        } = e
        return {
            episode: await episode,
            id,
            isListened,
            lastActivity,
            position
        }
    })))
})

router.get("/episode/:id", mustAuthenticated, async (req, res) => {
    const {value, error} = Joi.object({
        jwt: Joi.string()
    }).unknown(true).validate(req.query)
    const params = Joi.object({
        id: Joi.number()
    }).validate(req.params)
    if (error) throw error
    if (params.error) throw error
    const { jwt } = value 
    const { id } = params.value
    const auth = handleJWT<{id: number, username: string}>(jwt)
    const data = await getConnection().getRepository(ListenedModel).findOne({
        where: {
            'episode': id,
            'user': auth.id
        }
    })
    if (!data) return Returner.json(null)
    const {
        isListened,
        id: listenedId,
        lastActivity,
        position
    } = data
    Returner.json({
        isListened,
        id: listenedId,
        lastActivity,
        position
    })
})

router.post("/episode/:id", async (req, res) => {
    const {value, error} = Joi.object({
        position: Joi.number(),
        isListened: Joi.boolean(),
        jwt: Joi.string()
    }).unknown(true).validate(req.query)
    if (error) throw error
    const params = Joi.object({
        id: Joi.number().integer().sign('positive'),
    }).validate(req.params)
    if (params.error) throw error
    const { position, isListened, jwt } = value 
    const { id } = params.value
    const auth = handleJWT<{id: number, username: string}>(jwt)

    const user = await getConnection().getRepository(UserModel).findOneOrFail(auth.id)
    const episode = await getConnection().getRepository(EpisodeModel).findOneOrFail(id)
    let listened = await getConnection().getRepository(ListenedModel).findOne({
        where: {
            user: user.id,
            episode: episode.id
        }
    })
    if (!listened) {
        listened = new ListenedModel()
        listened.episode = Promise.resolve(episode)
        listened.user = user
    }
    listened.position = position
    listened.isListened = isListened
    listened.lastActivity = new Date()
    const result = await getConnection().getRepository(ListenedModel).save(listened)
    Returner.json(result.id)
})


export default router


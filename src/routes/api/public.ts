import express from "express";
import Joi from "joi";
import { getConnection } from "typeorm";
import Returner from "../../helpers/Returner";
import EpisodeModel from "../../models/Episode";
import PodcastModel from "../../models/Podcast";
import got from 'got';

const router = express.Router()

router.get("/episode/:id", async (req, res) => {
    const { error, value } = Joi.object({
        id: Joi.number().integer().sign('positive')
    }).unknown(true).validate(req.params)
    if (error) {
        Returner.badRequest(error.message)
    }
    const ret = await getConnection().getRepository(EpisodeModel).findByIds([value.id], {
        relations: ['podcast']
    })
    if (ret.length === 0) {
        Returner.errorCode(404, "episode not found")
    }
    Returner.json(ret[0])
})

router.get("/episode/:id/listen", async (req, res) => {
    const { error, value } = Joi.object({
        id: Joi.number().integer().sign('positive')
    }).unknown(true).validate(req.params)
    if (error) {
        Returner.badRequest(error.message)
    }
    const ret = await getConnection().getRepository(EpisodeModel).findByIds([value.id])
    if (ret.length === 0) {
        Returner.errorCode(404, "episode not found")
    }
    const pod = ret[0]
    const mp3res = got.stream(pod.mp3url)
    mp3res.pipe(res)
})

router.get("/podcast", async (req, res) => {
    Returner.json(await getConnection().getRepository(PodcastModel).find())
})

router.get("/podcast/:id", async (req, res) => {
    const { error, value } = Joi.object({
        id: Joi.number().integer().sign('positive')
    }).unknown(true).validate(req.params)
    if (error) {
        Returner.badRequest(error.message)
    }
    const ret = await getConnection().getRepository(PodcastModel).findByIds([value.id], {
        relations: ['episodes']
    })
    if (ret.length === 0) {
        Returner.errorCode(404, "podcast not found")
    }
    Returner.json(ret[0])
})

export default router
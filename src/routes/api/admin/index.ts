import express from "express";
import Joi from "joi";
import { getConnection } from "typeorm";
import { mustAdminAuthenticated } from "../../../helpers/auth";
import Returner from "../../../helpers/Returner";
import UserModel from "../../../models/User";
import parseFeed from "../../../helpers/parseFeed";

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
    })
    if (error) {
        Returner.badRequest(error.message)
    }
    const { url } = value
    const feed = parseFeed(url)
    Returner.json({
        feed
    })
})

export default router
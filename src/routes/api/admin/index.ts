import express from "express";
import Joi from "joi";
import { getConnection } from "typeorm";
import Returner from "../../../helpers/Returner";
import UserModel from "../../../models/User";

const router = express.Router()

router.get('/users', async () => {
    const users = await getConnection().getRepository(UserModel).find()
    Returner.json(
        users.map(u => {
            const {
                id,
                username
            } = u
            return {id, username}
        })
    )
})

router.get('/create-user', async (req, res) => {
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

export default router
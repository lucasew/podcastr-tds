import express from "express";
import Joi from "joi";
import { getConnection } from "typeorm";
import Returner from "../../helpers/Returner";
import UserModel from "../../models/User";
import jwt from 'jsonwebtoken';
import { jwtSign } from "../../helpers/jwt";

const router = express.Router()

router.get('/login', async (req, res) => {
    const {error, value} = Joi.object({
        username: Joi.string(),
        password: Joi.string()
    }).validate(req.query)
    if (error) {
        Returner.badRequest(error.message)
    }
    const user = await getConnection().getRepository(UserModel).findOne({where: {username: value.username}})
    if (user) {
        if (user.password == value.password) {
            Returner.json(jwtSign({uid: user.id}))
        }
    }
    Returner.errorCode(401, "Usuário ou senha inválido")
})

export default router
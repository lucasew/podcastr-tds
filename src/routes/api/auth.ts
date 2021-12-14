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
            const { id, is_admin } = user
            Returner.json(jwtSign({ id, is_admin }))
        }
    }
    Returner.errorCode(401, "Usuário ou senha inválido")
})

router.get('/signup', async (req, res) => {
    const { error, value } = Joi.object({
        username: Joi.string().regex(/[a-zA-Z0-9]*/).required(),
        password: Joi.string().min(8).required()
    }).validate(req.query)
    if (error) {
        Returner.badRequest(error.message)
    }
    const user = new UserModel()
    user.is_admin = false;
    user.username = value.username;
    user.password = value.password;
    await getConnection().getRepository(UserModel).insert(user)
    Returner.json(user.id)
})

export default router
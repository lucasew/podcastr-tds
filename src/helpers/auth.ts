import express from 'express';
import { jwtVerify } from './jwt';
import Returner from './Returner';

function handleJWT(jwt: string): any {
    try {
        const verify = jwtVerify(jwt as string)
        return verify
    } catch (e) {
        console.log(e)
        Returner.unauthorized()
    }
}

export const mustAuthenticated: express.RequestHandler = (req, res, next) => {
    const jwt = req.query.jwt || req.headers.authorization 
    if (typeof jwt != 'string') {
        console.log("não eh string")
        Returner.unauthorized()
    }
    handleJWT(jwt as string)
    next()
} 

export const mustAdminAuthenticated: express.RequestHandler = (req, res, next) => {
    const jwt = req.query.jwt || req.headers.authorization
    if (typeof jwt != 'string') {
        console.log("não eh string")
        Returner.unauthorized()
    }
    const verify = handleJWT(jwt as string)
    if (verify.is_admin !== true) {
        console.log("não eh ademir")
        Returner.unauthorized()
    }
    next()
} 
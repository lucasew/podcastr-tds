import express from 'express'
import { mustAdminAuthenticated, mustAuthenticated } from '../../helpers/auth'
import Returner from '../../helpers/Returner'

const router = express.Router()

router.get('/public', () => {
    Returner.json({
        hello: "world"
    })
})

router.get('/authenticated', mustAuthenticated, () => {
    Returner.json({
        ok: true
    })
})

router.get('/admin-authenticated', mustAdminAuthenticated, () => {
    Returner.json({
        ok: true
    })
})
export default router
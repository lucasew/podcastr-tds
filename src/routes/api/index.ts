import express from 'express'
import admin from './admin'
import auth from './auth'

const router = express.Router()

router.use('/admin', admin)
router.use('/auth', auth)

router.use('/hello', (req, res) => {
    res.json({
        demo: 'hello, world'
    })
})

export default router
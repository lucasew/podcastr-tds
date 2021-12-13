import express from 'express'
import admin from './admin'
import auth from './auth'
import demo from './demo'

const router = express.Router()

router.use('/admin', admin)
router.use('/auth', auth)
router.use('/demo', demo)

router.use('/hello', (req, res) => {
    res.json({
        demo: 'hello, world'
    })
})

export default router
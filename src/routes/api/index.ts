import express from 'express'

const router = express.Router()

router.use((req, res) => {
    res.json({
        demo: 'hello, world'
    })
})

export default router
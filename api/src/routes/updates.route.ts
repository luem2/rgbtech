import { Router } from 'express'
import { Brand, Tag } from '../db'

const router = Router()

router.put('/tags', async (req, res) => {
    const { id, name } = req.body
    try {
        await Tag.update(
            {
                name: name,
            },
            {
                where: {
                    id: id,
                },
            }
        )
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
})

router.put('/brands', async (req, res) => {
    const { id, name } = req.body
    try {
        await Brand.update(
            {
                name: name,
            },
            {
                where: {
                    id: id,
                },
            }
        )
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
})

export default router

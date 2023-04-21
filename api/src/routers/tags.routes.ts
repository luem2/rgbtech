import { Router } from 'express'

import tagsControllers from '../controllers/tags.controllers'
import authMiddlewares from '../middlewares/auth.middlewares'
import tagsMiddlewares from '../middlewares/tags.middlewares'

const router = Router()

router

    .get('/', authMiddlewares.checkAdminAuth, tagsControllers.getAllTags)

    .get(
        '/:name',
        [authMiddlewares.checkAdminAuth, tagsMiddlewares.normalizeTag],
        tagsControllers.getTag
    )

    .put(
        '/:name',
        [
            authMiddlewares.checkAdminAuth,
            tagsMiddlewares.checkNameTag,
            tagsMiddlewares.normalizeTag,
            tagsMiddlewares.checkBodyEditTag,
        ],
        tagsControllers.tagUpdate
    )

    .post(
        '/',
        [
            authMiddlewares.checkAdminAuth,
            tagsMiddlewares.checkNameTag,
            tagsMiddlewares.normalizeTag,
            tagsMiddlewares.checkBodyAddTag,
        ],
        tagsControllers.addTag
    )

    .delete('/:name', authMiddlewares.checkAdminAuth, tagsControllers.deleteTag)

    .patch(
        '/:name',
        [
            authMiddlewares.checkAdminAuth,
            tagsMiddlewares.normalizeTag,
            tagsMiddlewares.checkUpdateTagAvailability,
        ],
        tagsControllers.changeTagAvailability
    )

export default router

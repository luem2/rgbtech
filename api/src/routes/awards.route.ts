import { Router } from 'express'

import awardsControllers from '../controllers/awards.controller'
import authMiddlewares from '../middlewares/auth.middleware'
import awardsMiddlewares from '../middlewares/awards.middleware'
import { awardSchema } from '../schemas/'
import { parseBody, validateSchema } from '../middlewares'
import { multerTemp } from '../config/multer'

const router = Router()

router
    .get(
        '/',
        awardsMiddlewares.getAwardsAuthMiddleware,
        awardsControllers.getAllAwards
    )

    .get(
        '/:awardId',
        awardsMiddlewares.getAwardsAuthMiddleware,
        awardsControllers.getAward
    )

    .put(
        '/',
        [
            multerTemp.single('award'),
            authMiddlewares.checkAdminAuth,
            parseBody,
            validateSchema(awardSchema),
            awardsMiddlewares.checkBodyEditAward,
        ],
        awardsControllers.awardUpdate
    )

    .post(
        '/',
        [
            multerTemp.single('award'),
            authMiddlewares.checkAdminAuth,
            parseBody,
            validateSchema(awardSchema),
            awardsMiddlewares.checkBodyAddAward,
        ],
        awardsControllers.addAward
    )

    .delete(
        '/:id',
        authMiddlewares.checkAdminAuth,
        awardsControllers.deleteAward
    )

export default router

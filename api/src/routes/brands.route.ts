import { Router } from 'express'

import brandsControllers from '../controllers/brands.controller'
import authMiddlewares from '../middlewares/auth.middleware'
import brandsMiddlewares from '../middlewares/brands.middleware'
import { validateSchema } from '../middlewares'
import { brandSchema } from '../schemas'

const router = Router()

router

    .get('/', authMiddlewares.checkAdminAuth, brandsControllers.getAllBrands)

    .get('/:name', authMiddlewares.checkAdminAuth, brandsControllers.getBrand)

    .put(
        '/:name',
        [
            authMiddlewares.checkAdminAuth,
            validateSchema(brandSchema),
            brandsMiddlewares.checkBodyEditBrand,
        ],
        brandsControllers.brandUpdate
    )

    .post(
        '/',
        [
            authMiddlewares.checkAdminAuth,
            validateSchema(brandSchema),
            brandsMiddlewares.checkBodyAddBrand,
        ],
        brandsControllers.addBrand
    )

    .patch(
        '/:name',
        [
            authMiddlewares.checkAdminAuth,
            brandsMiddlewares.checkUpdateBrandAvailability,
        ],
        brandsControllers.changeBrandAvailability
    )

export default router

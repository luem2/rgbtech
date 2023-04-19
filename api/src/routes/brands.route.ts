import { Router } from 'express'

import brandsControllers from '../controllers/brands.controller'
import authMiddlewares from '../middlewares/auth.middleware'
import brandsMiddlewares from '../middlewares/brands.middleware'
import { parseBody, validateSchema } from '../middlewares'
import { brandSchema } from '../schemas'
import { multerTemp } from '../config/multer'

const router = Router()

router

    .get('/', authMiddlewares.checkAdminAuth, brandsControllers.getAllBrands)

    .get('/:name', authMiddlewares.checkAdminAuth, brandsControllers.getBrand)

    .put(
        '/:name',
        [
            multerTemp.single('brand'),
            authMiddlewares.checkAdminAuth,
            parseBody,
            validateSchema(brandSchema),
            brandsMiddlewares.checkBodyEditBrand,
        ],
        brandsControllers.brandUpdate
    )

    .post(
        '/',
        [
            multerTemp.single('brand'),
            authMiddlewares.checkAdminAuth,
            parseBody,
            validateSchema(brandSchema),
            brandsMiddlewares.checkBodyAddBrand,
        ],
        brandsControllers.addBrand
    )

    .delete(
        '/:name',
        authMiddlewares.checkAdminAuth,
        brandsControllers.deleteBrand
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

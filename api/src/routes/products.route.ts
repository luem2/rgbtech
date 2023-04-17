import { Router } from 'express'

import productsControllers from '../controllers/products.controller'
import authMiddlewares from '../middlewares/auth.middleware'
import productsMiddlewares from '../middlewares/products.middleware'
import { productSchema } from '../helpers/dto/product.schema'
import { validateSchema } from '../helpers/validateRequest'
import { multerCore, multerTemp } from '../config/multer'
import { parseBody } from '../helpers/parseBody'

const router = Router()

router
    .get(
        '/',
        productsMiddlewares.getProductsAuthMiddleware,
        productsMiddlewares.checkQueryObjectFilters,
        productsControllers.getAllProducts
    )

    .get(
        '/:productId',
        productsMiddlewares.getProductsAuthMiddleware,
        productsControllers.getProduct
    )

    .put(
        '/',
        [
            authMiddlewares.checkAdminAuth,
            validateSchema(productSchema),
            productsMiddlewares.checkBrandAndTags,
            productsMiddlewares.checkBodyEditProduct,
        ],
        productsControllers.productUpdate
    )

    .put(
        '/picture',
        [
            authMiddlewares.checkAdminAuth,
            productsMiddlewares.checkUpdatePictureProduct,
            multerCore.single('product'),
        ],
        productsControllers.productPictureUpdate
    )

    .post(
        '/',
        [
            multerTemp.single('product'),
            authMiddlewares.checkAdminAuth,
            parseBody,
            validateSchema(productSchema),
            productsMiddlewares.checkBrandAndTags,
            productsMiddlewares.checkBodyAddProduct,
        ],
        productsControllers.addProduct
    )

    .patch(
        '/:productId',
        [
            authMiddlewares.checkAdminAuth,
            productsMiddlewares.checkUpdateProductAvailability,
        ],
        productsControllers.changeProductAvailability
    )

export default router

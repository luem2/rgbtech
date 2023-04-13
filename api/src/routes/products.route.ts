import { Router } from 'express'

import productsControllers from '../controllers/products.controller'
import authMiddlewares from '../middlewares/auth.middleware'
import productsMiddlewares from '../middlewares/products.middleware'
import { productSchema } from '../helpers/dto/product.schema'
import { validateSchema } from '../helpers/validateRequest'

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
            productsMiddlewares.checkBodyEditProduct,
            productsMiddlewares.checkBrandAndTags,
        ],
        productsControllers.productUpdate
    )

    .post(
        '/',
        [
            authMiddlewares.checkAdminAuth,
            validateSchema(productSchema),
            productsMiddlewares.checkBodyAddProduct,
            productsMiddlewares.checkBrandAndTags,
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

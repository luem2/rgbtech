import { Router } from 'express'

import productsController from '../controllers/products.controller'
import authMiddlewares from '../middlewares/auth.middleware'
import productsMiddlewares from '../middlewares/products.middleware'
import { productSchema } from '../helpers/dto/product.schema'
import { validateSchema } from '../helpers/validateRequest'

const router = Router()

router
    // TODO: Agregar Multiples filtros con QUERY (Fijarse que filtros hay en rgbtech.vercel.app y agregar nuevos)
    // [ ] freeShipping
    // [ ] onDiscount
    // [ ] rating
    .get(
        '/',
        productsMiddlewares.getProductsAuthMiddleware,
        productsController.getAllProducts
    )

    .get(
        '/:productId',
        productsMiddlewares.getProductsAuthMiddleware,
        productsController.getProduct
    )

    .put(
        '/',
        [
            authMiddlewares.checkAdminAuth,
            validateSchema(productSchema),
            productsMiddlewares.checkBodyEditProduct,
        ],
        productsController.productUpdate
    )

    .post(
        '/',
        [
            authMiddlewares.checkAdminAuth,
            validateSchema(productSchema),
            productsMiddlewares.checkBodyAddProduct,
        ],
        productsController.addProduct
    )

    .patch(
        '/:productId',
        [
            authMiddlewares.checkAdminAuth,
            productsMiddlewares.checkUpdateProductAvailability,
        ],
        productsController.changeProductAvailability
    )

export default router

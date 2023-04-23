import { Router } from 'express'

import productsControllers from '../controllers/products.controllers'
import authMiddlewares from '../middlewares/auth.middlewares'
import productsMiddlewares from '../middlewares/products.middlewares'
import { productSchema } from '../schemas/product.schemas'
import { validateSchema, parseBody } from '../middlewares'
import { multerCore, multerTemp } from '../config/multer'

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

    .delete(
        '/:productId',
        authMiddlewares.checkAdminAuth,
        productsControllers.deleteProduct
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
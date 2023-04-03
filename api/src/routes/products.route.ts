import { Router } from 'express'

import productsController from '../controllers/products.controller'
import authMiddlewares from '../middlewares/auth.middleware'

const router = Router()

router
    .get('/', productsController.getAllProducts)

    .get('/:productId', productsController.getProduct)

    .put(
        '/:productId',
        authMiddlewares.checkAdminAuth,
        productsController.productUpdate
    )

    .patch('/:productId', authMiddlewares.checkAdminAuth)

export default router

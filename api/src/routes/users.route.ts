import { Router } from 'express'

import multer from '../config/multer'
import usersControllers from '../controllers/users.controller'
import authMiddlewares from '../middlewares/auth.middleware'
import usersMiddlewares from '../middlewares/users.middleware'
import { editUserSchema, newPasswordSchema } from '../helpers/dto/'
import { validateSchema } from '../helpers/validateRequest'

const router = Router()

router

    .get('/', authMiddlewares.checkAdminAuth, usersControllers.getAllUsers)

    .get(
        '/shopping-cart',
        authMiddlewares.checkAuth,
        usersControllers.getShoppingCart
    )

    .put(
        '/profile',
        [
            authMiddlewares.checkAuth,
            usersMiddlewares.checkUserEmailUpdateProfile,
            validateSchema(editUserSchema),
        ],
        usersControllers.updateProfile
    )

    .put(
        '/password',
        [
            authMiddlewares.checkAuth,
            usersMiddlewares.checkUserOldPassword,
            validateSchema(newPasswordSchema),
        ],
        usersControllers.updatePassword
    )

    .put(
        '/profilePhoto',
        [authMiddlewares.checkAuth, multer.single('avatar')],
        usersControllers.changeProfilePhoto
    )

    .put(
        '/shopping-cart/',
        authMiddlewares.checkAuth,
        usersControllers.modifyItemQuantity
    )

    .post(
        '/shopping-cart',
        authMiddlewares.checkAuth,
        usersControllers.addItemToCart
    )

    .delete(
        '/shopping-cart',
        authMiddlewares.checkAuth,
        usersControllers.cleanShoppingCart
    )

    .delete(
        '/shopping-cart/:productId',
        authMiddlewares.checkAuth,
        usersControllers.deleteItemFromCart
    )

export default router

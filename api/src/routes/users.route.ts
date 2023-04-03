import { Router } from 'express'

import multer from '../config/multer'
import usersController from '../controllers/users.controller'
import authMiddlewares from '../middlewares/auth.middleware'
import usersMiddlewares from '../middlewares/users.middleware'
import { editUserSchema, newPasswordSchema } from '../helpers/dto/'
import { validateSchema } from '../helpers/validateRequest'

const router = Router()

router
    .get('/', authMiddlewares.checkAdminAuth, usersController.getAllUsers)

    .get(
        '/shopping-cart',
        authMiddlewares.checkAuth,
        usersController.getShoppingCart
    )

    .get('/favorites', authMiddlewares.checkAuth, usersController.getFavorites)

    .get('/reviews', authMiddlewares.checkAuth, usersController.getReviews)

    .get(
        '/transactions',
        authMiddlewares.checkAuth,
        usersController.getTransactions
    )

    .get('/history', authMiddlewares.checkAuth, usersController.getHistory)

    .put(
        '/profile',
        [
            authMiddlewares.checkAuth,
            usersMiddlewares.checkUserEmailProfileUpdate,
            validateSchema(editUserSchema),
        ],
        usersController.profileUpdate
    )

    .put(
        '/password',
        [
            authMiddlewares.checkAuth,
            usersMiddlewares.checkUserOldPassword,
            validateSchema(newPasswordSchema),
        ],
        usersController.passwordUpdate
    )

    .put(
        '/profilePhoto',
        [authMiddlewares.checkAuth, multer.single('avatar')],
        usersController.changeProfilePhoto
    )

    .put(
        '/shopping-cart/',
        [
            authMiddlewares.checkAuth,
            usersMiddlewares.itemQuantityCannotBeNullOrNegative,
        ],
        usersController.modifyItemQuantity
    )

    .post(
        '/favorites',

        [
            authMiddlewares.checkAuth,
            usersMiddlewares.itemAlreadyExistsInFavorites,
        ],
        usersController.addItemToFavorites
    )

    .post(
        '/shopping-cart',
        [authMiddlewares.checkAuth, usersMiddlewares.itemAlreadyExistsInCart],
        usersController.addItemToCart
    )

    .post(
        '/reviews',
        [authMiddlewares.checkAuth, usersMiddlewares.checkReviewBody],
        usersController.addReview
    )

    .post(
        '/history',
        [authMiddlewares.checkAuth, usersMiddlewares.checkHistoryLength],
        usersController.addLastVisitedToHistory
    )

    .delete(
        '/shopping-cart',
        [
            authMiddlewares.checkAuth,
            usersMiddlewares.shoppingCartIsAlreadyEmpty,
        ],
        usersController.cleanShoppingCart
    )

    .delete(
        '/shopping-cart/:productId',
        [authMiddlewares.checkAuth, usersMiddlewares.itemNotFoundInsideCart],
        usersController.deleteItemFromCart
    )

    .delete(
        '/favorites',

        [authMiddlewares.checkAuth, usersMiddlewares.favoritesIsAlreadyEmpty],

        usersController.cleanFavorites
    )

    .delete(
        '/favorites/:productId',
        [
            authMiddlewares.checkAuth,
            usersMiddlewares.itemNotFoundInsideFavorites,
        ],
        usersController.deleteItemFromFavorites
    )

export default router

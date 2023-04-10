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

    .get('/favorites', authMiddlewares.checkAuth, usersControllers.getFavorites)

    .get('/reviews', authMiddlewares.checkAuth, usersControllers.getReviews)

    .get(
        '/transactions',
        authMiddlewares.checkAuth,
        usersControllers.getTransactions
    )

    .get('/history', authMiddlewares.checkAuth, usersControllers.getHistory)

    .put(
        '/profile',
        [
            authMiddlewares.checkAuth,
            usersMiddlewares.checkUserEmailProfileUpdate,
            validateSchema(editUserSchema),
        ],
        usersControllers.profileUpdate
    )

    .put(
        '/password',
        [
            authMiddlewares.checkAuth,
            usersMiddlewares.checkUserOldPassword,
            validateSchema(newPasswordSchema),
        ],
        usersControllers.passwordUpdate
    )

    .put(
        '/profilePhoto',
        [authMiddlewares.checkAuth, multer.single('avatar')],
        usersControllers.changeProfilePhoto
    )

    .put(
        '/shopping-cart/',
        [
            authMiddlewares.checkAuth,
            usersMiddlewares.itemQuantityCannotBeNullOrNegative,
        ],
        usersControllers.modifyItemQuantity
    )

    .post(
        '/favorites',

        [
            authMiddlewares.checkAuth,
            usersMiddlewares.itemAlreadyExistsInFavorites,
        ],
        usersControllers.addItemToFavorites
    )

    .post(
        '/shopping-cart',
        [authMiddlewares.checkAuth, usersMiddlewares.itemAlreadyExistsInCart],
        usersControllers.addItemToCart
    )

    .post(
        '/reviews',
        [authMiddlewares.checkAuth, usersMiddlewares.checkReviewBody],
        usersControllers.addReview
    )

    .post(
        '/history',
        [authMiddlewares.checkAuth, usersMiddlewares.checkHistoryLength],
        usersControllers.addLastVisitedToHistory
    )

    .patch(
        '/:userId',
        [
            authMiddlewares.checkAdminAuth,
            usersMiddlewares.changeUpdateUserAvailability,
        ],
        usersControllers.changeUserAvailability
    )

    .delete(
        '/shopping-cart',
        [
            authMiddlewares.checkAuth,
            usersMiddlewares.shoppingCartIsAlreadyEmpty,
        ],
        usersControllers.cleanShoppingCart
    )

    .delete(
        '/shopping-cart/:productId',
        [authMiddlewares.checkAuth, usersMiddlewares.itemNotFoundInsideCart],
        usersControllers.deleteItemFromCart
    )

    .delete(
        '/favorites',

        [authMiddlewares.checkAuth, usersMiddlewares.favoritesIsAlreadyEmpty],

        usersControllers.cleanFavorites
    )

    .delete(
        '/favorites/:productId',
        [
            authMiddlewares.checkAuth,
            usersMiddlewares.itemNotFoundInsideFavorites,
        ],
        usersControllers.deleteItemFromFavorites
    )

export default router

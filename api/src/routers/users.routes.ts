import { editUserSchema, newPasswordSchema } from '../schemas'
import {
    parseRequest,
    validateBirthDateAndCountry,
    validateSchema,
} from '../middlewares'
import { BaseRouter } from '../config/bases'
import { UserControllers } from '../controllers/users.controllers'
import { UserMiddlewares } from '../middlewares/users.middlewares'
import multer from '../config/multer'

export class UserRouter extends BaseRouter<UserControllers, UserMiddlewares> {
    constructor() {
        super(UserControllers, UserMiddlewares)
        this.routes()
    }

    routes() {
        this.router.get(
            '/',
            this.auth.checkAdminAuth,
            this.controllers.getAllUsers
        )

        this.router.get(
            '/shopping-cart',
            this.auth.checkAuth,
            this.controllers.getShoppingCart
        )

        this.router.get(
            '/favorites',
            this.auth.checkAuth,
            this.controllers.getFavorites
        )

        this.router.get(
            '/reviews',
            this.auth.checkAuth,
            this.controllers.getReviews
        )

        this.router.get(
            '/transactions',
            this.auth.checkAuth,
            this.controllers.getTransactions
        )

        this.router.get(
            '/history',
            this.auth.checkAuth,
            this.controllers.getHistory
        )

        this.router.post(
            '/shopping-cart',
            this.auth.checkAuth,
            [
                this.middlewares.checkIfProductExists,
                this.middlewares.itemAlreadyExistsInCart,
            ],
            this.controllers.addItemToCart
        )

        this.router.post(
            '/favorites',
            this.auth.checkAuth,
            [
                this.middlewares.checkIfProductExists,
                this.middlewares.itemAlreadyExistsInFavorites,
            ],
            this.controllers.addItemToFavorites
        )

        this.router.post(
            '/reviews',
            this.auth.checkAuth,
            [
                parseRequest('body'),
                this.middlewares.checkIfProductExists,
                this.middlewares.checkReviewBody,
            ],
            this.controllers.addReview
        )

        this.router.put(
            '/profile',
            this.auth.checkAuth,
            [
                validateSchema(editUserSchema),
                this.middlewares.checkIfUserIsLoggedWithGoogle,
                this.middlewares.checkIfUserAlreadyExists,
                validateBirthDateAndCountry,
            ],
            this.controllers.profileUpdate
        )

        this.router.put(
            '/profilePhoto',
            this.auth.checkAuth,
            [
                multer.single('avatar'),
                this.middlewares.checkIfUserIsLoggedWithGoogle,
            ],
            this.controllers.changeProfilePhoto
        )

        this.router.put(
            '/password',
            this.auth.checkAuth,
            [
                this.middlewares.checkUserOldPassword,
                validateSchema(newPasswordSchema),
            ],
            this.controllers.passwordUpdate
        )

        this.router.put(
            '/shopping-cart/:id',
            this.auth.checkAuth,
            [
                parseRequest('body'),
                this.middlewares.checkIfProductExists,
                this.middlewares.checkProductExistsInCartAndQuantity,
            ],
            this.controllers.modifyItemQuantity
        )

        this.router.put(
            '/claim-award/:id',
            this.auth.checkAuth,
            this.middlewares.checkClaimAward,
            this.controllers.claimAward
        )

        this.router.delete(
            '/shopping-cart',
            this.auth.checkAuth,
            this.middlewares.shoppingCartIsAlreadyEmpty,
            this.controllers.cleanShoppingCart
        )

        this.router.delete(
            '/shopping-cart/:id',
            this.auth.checkAuth,
            this.middlewares.itemNotFoundInsideCart,
            this.controllers.deleteItemFromCart
        )

        this.router.delete(
            '/favorites',
            this.auth.checkAuth,
            this.middlewares.favoritesIsAlreadyEmpty,
            this.controllers.cleanFavorites
        )

        this.router.delete(
            '/favorites/:id',
            this.auth.checkAuth,
            this.middlewares.itemNotFoundInsideFavorites,
            this.controllers.deleteItemFromFavorites
        )

        this.router.delete(
            '/history',
            this.auth.checkAuth,
            this.middlewares.checkIfHistoryIsAlreadyEmpty,
            this.controllers.cleanHistory
        )

        this.router.patch(
            '/',
            this.auth.checkAdminAuth,
            [
                parseRequest('body'),
                this.middlewares.changeUpdateUserAvailability,
            ],
            this.controllers.changeUserAvailability
        )
    }
}

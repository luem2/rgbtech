import { editUserSchema, newPasswordSchema } from '../schemas'
import { validateSchema } from '../middlewares'
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

        this.router.put(
            '/profile',
            [
                this.auth.checkAuth,
                this.middlewares.checkBirthDateType,
                validateSchema(editUserSchema),
                this.middlewares.checkBodyProfileUpdate,
            ],
            this.controllers.profileUpdate
        )

        this.router.put(
            '/password',
            [
                this.auth.checkAuth,
                this.middlewares.checkUserOldPassword,
                validateSchema(newPasswordSchema),
            ],
            this.controllers.passwordUpdate
        )

        this.router.put(
            '/profilePhoto',
            [this.auth.checkAuth, multer.single('avatar')],
            this.controllers.changeProfilePhoto
        )

        this.router.put(
            '/shopping-cart/',
            [
                this.auth.checkAuth,
                this.middlewares.itemQuantityCannotBeNullOrNegative,
            ],
            this.controllers.modifyItemQuantity
        )

        this.router.put(
            '/claim-award',
            [this.auth.checkAuth, this.middlewares.checkClaimAward],
            this.controllers.claimAward
        )

        this.router.post(
            '/favorites',

            [
                this.auth.checkAuth,
                this.middlewares.itemAlreadyExistsInFavorites,
            ],
            this.controllers.addItemToFavorites
        )

        this.router.post(
            '/shopping-cart',
            [this.auth.checkAuth, this.middlewares.itemAlreadyExistsInCart],
            this.controllers.addItemToCart
        )

        this.router.post(
            '/reviews',
            [this.auth.checkAuth, this.middlewares.checkReviewBody],
            this.controllers.addReview
        )

        this.router.post(
            '/history',
            [this.auth.checkAuth, this.middlewares.checkHistoryLength],
            this.controllers.addLastVisitedToHistory
        )

        this.router.patch(
            '/:userId',
            [
                this.auth.checkAdminAuth,
                this.middlewares.changeUpdateUserAvailability,
            ],
            this.controllers.changeUserAvailability
        )

        this.router.delete(
            '/shopping-cart',
            [this.auth.checkAuth, this.middlewares.shoppingCartIsAlreadyEmpty],
            this.controllers.cleanShoppingCart
        )

        this.router.delete(
            '/shopping-cart/:productId',
            [this.auth.checkAuth, this.middlewares.itemNotFoundInsideCart],
            this.controllers.deleteItemFromCart
        )

        this.router.delete(
            '/favorites',

            [this.auth.checkAuth, this.middlewares.favoritesIsAlreadyEmpty],

            this.controllers.cleanFavorites
        )

        this.router.delete(
            '/favorites/:productId',
            [this.auth.checkAuth, this.middlewares.itemNotFoundInsideFavorites],
            this.controllers.deleteItemFromFavorites
        )
    }
}

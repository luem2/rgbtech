import { createUserSchema, emailSchema, newPasswordSchema } from '../schemas'
import { validateBirthDateAndCountry, validateSchema } from '../middlewares'
import { BaseRouter } from '../config/bases'
import { AuthControllers } from '../controllers/auth.controllers'
import { AuthMiddlewares } from '../middlewares/auth.middlewares'
import multer from '../config/multer'

export class AuthRouter extends BaseRouter<AuthControllers, AuthMiddlewares> {
    constructor() {
        super(AuthControllers, AuthMiddlewares)
        this.routes()
    }

    routes() {
        this.router.get(
            '/profile',
            this.middlewares.checkAuth,
            this.controllers.profile
        )

        this.router.get(
            '/google-url',
            [
                this.middlewares.checkIfUserIsLogged,
                this.middlewares.getGoogleOAuthURL,
            ],
            this.controllers.redirectGooglePrompt
        )

        this.router.get(
            '/google-auth',
            [
                this.middlewares.getGoogleOAuthToken,
                this.middlewares.checkGoogleAuth,
            ],
            this.controllers.googleAuth
        )

        this.router.put(
            '/account-confirmation',
            [
                this.middlewares.checkAuth,
                this.middlewares.userIsAlreadyConfirmed,
            ],
            this.controllers.accountConfirmation
        )

        this.router.put(
            '/password-recovery',
            [this.middlewares.checkAuth, validateSchema(newPasswordSchema)],
            this.controllers.passwordRecovery
        )

        this.router.post(
            '/login',
            this.middlewares.checkLoginBody,
            this.controllers.login
        )

        this.router.post(
            '/register',
            [
                multer.single('avatar'),
                validateSchema(createUserSchema),
                this.middlewares.checkIfUserAlreadyExists,
                validateBirthDateAndCountry,
            ],
            this.controllers.register
        )

        this.router.post(
            '/password-recovery-email',
            [validateSchema(emailSchema), this.middlewares.checkIfUserExists],
            this.controllers.passwordRecoveryEmail
        )

        this.router.delete(
            '/:id',
            [
                this.middlewares.checkAdminAuth,
                this.middlewares.checkIfUserExists,
            ],
            this.controllers.deleteUser
        )
    }
}

import {
    createUserSchema,
    createUserSchemaWithGoogle,
    emailSchema,
    newPasswordSchema,
} from '../schemas'
import { validateSchema } from '../middlewares'
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
            '/password-recovery-email',
            [validateSchema(emailSchema), this.middlewares.checkIfUserExists],
            this.controllers.passwordRecoveryEmail
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
                this.middlewares.checkRegisterBody,
            ],
            this.controllers.register
        )

        this.router.post(
            '/register-google',
            [
                validateSchema(createUserSchemaWithGoogle),
                this.middlewares.userIsAlreadyConfirmed,
            ],
            this.controllers.register
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

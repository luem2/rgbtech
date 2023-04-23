import { emailSchema, newPasswordSchema } from '../schemas'
import { validateSchema } from '../middlewares'
import { multerTemp } from '../config/multer'
import { BaseRouter } from '../config/bases'
import { AuthControllers } from '../controllers/auth.controllers'
import { AuthMiddlewares } from '../middlewares/auth.middlewares'

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
            '/account-confirmation/:id',
            this.middlewares.userIsAlreadyConfirmed,
            this.controllers.accountConfirmation
        )

        this.router.put(
            '/password-recovery/:id',
            validateSchema(newPasswordSchema),
            this.controllers.passwordRecovery
        )

        this.router.post(
            '/password-recovery-email',
            validateSchema(emailSchema),
            this.controllers.passwordRecoveryEmail
        )

        this.router.post(
            '/login',
            this.middlewares.checkLoginBody,
            this.controllers.login
        )

        this.router.post(
            '/register',
            [multerTemp.single('avatar'), this.middlewares.checkRegisterBody],
            this.controllers.register
        )

        this.router.delete(
            '/:userId',
            this.middlewares.checkAdminAuth,
            this.controllers.deleteUser
        )
    }
}

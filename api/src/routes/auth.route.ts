import { Router } from 'express'

import authControllers from '../controllers/auth.controller'
import authMiddlewares from '../middlewares/auth.middleware'
import {
    createUserSchema,
    emailSchema,
    loginUserSchema,
    newPasswordSchema,
} from '../helpers/dto'
import { validateSchema } from '../helpers/validateRequest'

const router = Router()

router

    .get('/profile', authMiddlewares.checkAuth, authControllers.profile)

    .put('/account-confirmation/:id', authControllers.accountConfirmation)

    .put(
        '/password-recovery/:id',
        validateSchema(newPasswordSchema),
        authControllers.passwordRecovery
    )

    .post(
        '/password-recovery-email',
        validateSchema(emailSchema),
        authControllers.passwordRecoveryEmail
    )

    .post(
        '/login',
        [
            validateSchema(loginUserSchema),
            authMiddlewares.checkUserEmailVerificated,
        ],
        authControllers.login
    )

    .post(
        '/register',
        [validateSchema(createUserSchema), authMiddlewares.checkUserExists],
        authControllers.register
    )

export default router

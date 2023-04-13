import { Router } from 'express'

import authControllers from '../controllers/auth.controller'
import authMiddlewares from '../middlewares/auth.middleware'
import { emailSchema, newPasswordSchema } from '../helpers/dto'
import { validateSchema } from '../helpers/validateRequest'

const router = Router()

router

    .get('/profile', authMiddlewares.checkAuth, authControllers.profile)

    .put(
        '/account-confirmation/:id',
        authMiddlewares.userIsAlreadyConfirmed,
        authControllers.accountConfirmation
    )

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

    .post('/login', authMiddlewares.checkLoginBody, authControllers.login)

    .post(
        '/register',
        authMiddlewares.checkRegisterBody,
        authControllers.register
    )

export default router

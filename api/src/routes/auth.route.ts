import { Router } from 'express'

import authController from '../controllers/auth.controller'
import authMiddlewares from '../middlewares/auth.middleware'
import { emailSchema, newPasswordSchema } from '../helpers/dto'
import { validateSchema } from '../helpers/validateRequest'

const router = Router()

router

    .get('/profile', authMiddlewares.checkAuth, authController.profile)

    .put('/account-confirmation/:id', authController.accountConfirmation)

    .put(
        '/password-recovery/:id',
        validateSchema(newPasswordSchema),
        authController.passwordRecovery
    )

    .post(
        '/password-recovery-email',
        validateSchema(emailSchema),
        authController.passwordRecoveryEmail
    )

    .post('/login', authMiddlewares.checkLoginBody, authController.login)

    .post(
        '/register',
        authMiddlewares.checkRegisterBody,
        authController.register
    )

export default router

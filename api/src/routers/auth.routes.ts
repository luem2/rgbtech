import { Router } from 'express'

import authControllers from '../controllers/auth.controllers'
import authMiddlewares from '../middlewares/auth.middlewares'
import { emailSchema, newPasswordSchema } from '../schemas'
import { validateSchema } from '../middlewares'
import { multerTemp } from '../config/multer'

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
        [multerTemp.single('avatar'), authMiddlewares.checkRegisterBody],
        authControllers.register
    )

    .delete(
        '/:userId',
        authMiddlewares.checkAdminAuth,
        authControllers.deleteUser
    )

export default router

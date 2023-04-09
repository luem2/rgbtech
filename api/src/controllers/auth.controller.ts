import type { Request, Response } from 'express'

import authServices from '../services/auth.service'

class AuthControllers {
    async login(req: Request, res: Response) {
        const userToken = await authServices.login(req.body)

        res.status(200).header('auth-token', userToken).send({
            status: 'Success',
            msg: 'User was successfully logged in',
        })
    }

    async register(req: Request, res: Response) {
        const newUser = await authServices.register(req.body)

        res.status(200).send({
            status: 'Success',
            msg: 'User has been successfully created, please confirm your account. We have sent you a confirmation email',
            body: newUser,
        })
    }

    async profile(req: Request, res: Response) {
        const userProfile = await authServices.getProfile(req)

        res.status(200).send({
            status: 'Success',
            msg: 'User found! Data was sent',
            body: userProfile,
        })
    }

    async passwordRecovery(req: Request, res: Response) {
        const userWithNewPassword = await authServices.passwordUpdate(req)

        res.status(200).send({
            status: 'Success',
            msg: 'User Password was successfully updated',
            body: userWithNewPassword,
        })
    }

    async passwordRecoveryEmail(req: Request, res: Response) {
        await authServices.passwordRecoveryEmail(req)

        res.status(200).send({
            status: 'Success',
            msg: 'The email has been sent, check your mailbox',
        })
    }

    async accountConfirmation(req: Request, res: Response) {
        await authServices.accountConfirmation(req)

        res.status(200).send({
            status: 'Success',
            msg: 'The email was successfully verified',
        })
    }
}

export default new AuthControllers()

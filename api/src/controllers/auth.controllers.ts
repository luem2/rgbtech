import type { Request, Response } from 'express'

import { BaseControllers } from '../config/bases'
import { AuthServices } from '../services/auth.services'
import { COOKIE_OPTIONS } from '../helpers/constants'

export class AuthControllers extends BaseControllers<AuthServices> {
    constructor() {
        super(AuthServices)
    }

    redirectGooglePrompt = ({ params }: Request, res: Response) => {
        res.redirect(params.url)
    }

    googleAuth = async ({ body }: Request, res: Response) => {
        this.httpResponse.Ok(
            res,
            body.user
                ? {
                      msg: 'User was successfully created and logged in',
                      user: body.user,
                  }
                : 'User was successfully logged in'
        )
    }

    profile = async (req: Request, res: Response) => {
        const user = await this.services.getProfile(req.userId)

        this.httpResponse.Ok(res, {
            msg: 'User profile was successfully found',
            user,
        })
    }

    login = async (req: Request, res: Response) => {
        const userToken = await this.services.login(req.body)

        res.cookie('token', userToken, COOKIE_OPTIONS)

        this.httpResponse.Ok(res, ' User was successfully logged in')
    }

    register = async (req: Request, res: Response) => {
        const newUser = await this.services.register(req)

        this.httpResponse.Created(res, {
            msg: 'User has been successfully created, please confirm your account. We have sent you a confirmation email',
            user: newUser,
        })
    }

    passwordRecovery = async (req: Request, res: Response) => {
        await this.services.passwordUpdate(req)

        this.httpResponse.Ok(res, ' User Password was successfully updated')
    }

    passwordRecoveryEmail = async (req: Request, res: Response) => {
        const userName = await this.services.passwordRecoveryEmail(req.body)

        this.httpResponse.Ok(
            res,
            `The email has been sent, check your mailbox ${userName}`
        )
    }

    accountConfirmation = async (req: Request, res: Response) => {
        await this.services.accountConfirmation(req.userId)

        this.httpResponse.Ok(res, 'The account has been successfully confirmed')
    }

    logout = async (_req: Request, res: Response) => {
        res.clearCookie('token')

        this.httpResponse.Ok(res, 'User was successfully logged out')
    }

    deleteUser = async (req: Request, res: Response) => {
        const user = await this.services.deleteUser(req.body)

        this.httpResponse.Ok(res, {
            msg: 'The user has been successfully deleted',
            user,
        })
    }
}

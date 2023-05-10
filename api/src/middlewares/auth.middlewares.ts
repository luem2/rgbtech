import type { NextFunction, Request, Response } from 'express'
import type { GoogleTokensResult } from '../types'

import bcrypt from 'bcrypt'
import axios from 'axios'

import { db } from '../database'
import {
    decodeToken,
    signToken,
    verifyToken,
    verifyTokenWithoutBreaking,
} from '../helpers/generateToken'
import { HttpError } from '../helpers/customError'
import { config } from '../config'
import { COOKIE_OPTIONS, GOOGLE_REDIRECT } from '../helpers/constants'

export class AuthMiddlewares {
    public HttpError: typeof HttpError

    constructor() {
        this.HttpError = HttpError
    }

    checkAuth = async (req: Request, _res: Response, next: NextFunction) => {
        try {
            const { token } = req.cookies

            if (!token) throw new this.HttpError(404, 'Token not found')

            req.userId = verifyToken(token).id

            next()
        } catch (error) {
            next(error)
        }
    }

    checkAdminAuth = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            const { token } = req.cookies

            if (!token) throw new this.HttpError(404, 'Token not found')

            const verifiedToken = verifyToken(token)

            if (verifiedToken.role !== 'ADMIN')
                throw new this.HttpError(
                    401,
                    'You are not authorized to access this resource or perform this operation'
                )

            next()
        } catch (error) {
            next(error)
        }
    }

    checkIfUserIsLogged = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            const { token } = req.cookies

            if (token) {
                const tokenDecoded = verifyTokenWithoutBreaking(token)

                if (tokenDecoded)
                    throw new this.HttpError(401, 'Already logged')
            }

            next()
        } catch (error) {
            next(error)
        }
    }

    checkLoginBody = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            if (!req.body.email)
                throw new this.HttpError(404, 'Email field missing')

            const user = await db.user.findUnique({
                where: {
                    email: req.body.email,
                },
            })

            if (!user) throw new this.HttpError(404, 'User not found')

            if (user.google)
                throw new this.HttpError(
                    401,
                    'This account was created by Google Auth, login with Google instead'
                )

            if (!req.body.password)
                throw new this.HttpError(404, 'Password field missing')

            const verificatedPassword = await bcrypt.compare(
                req.body.password,
                user.password as string
            )

            if (!verificatedPassword)
                throw new this.HttpError(
                    401,
                    'Password entered is incorrect, try again or recover it'
                )

            if (!user.verificated)
                throw new this.HttpError(
                    401,
                    'You have not verified your email'
                )

            req.body = user

            next()
        } catch (error) {
            next(error)
        }
    }

    userIsAlreadyConfirmed = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            const user = await db.user.findUnique({
                where: {
                    id: req.userId,
                },
                select: {
                    verificated: true,
                },
            })

            if (user?.verificated)
                throw new this.HttpError(
                    401,
                    'The account is already confirmed'
                )

            next()
        } catch (error) {
            next(error)
        }
    }

    checkIfUserExists = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            const user = await db.user.findUnique({
                where: {
                    id: req.params.id,
                    email: req.body.email,
                },
            })

            if (!user) throw new this.HttpError(404, 'User not found')

            req.body = user

            next()
        } catch (error) {
            next(error)
        }
    }

    checkIfUserAlreadyExists = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            const userExists = await db.user.findUnique({
                where: {
                    email: req.body.email,
                },
            })

            if (userExists)
                throw new this.HttpError(
                    401,
                    'A user is already registered with this email address'
                )

            next()
        } catch (error) {
            next(error)
        }
    }

    getGoogleOAuthURL = (req: Request, _res: Response, next: NextFunction) => {
        const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth'

        const options = {
            redirect_uri: config.API_URL + GOOGLE_REDIRECT,
            client_id: config.GOOGLE_CLIENT_ID,
            access_type: 'offline',
            response_type: 'code',
            prompt: 'consent',
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email',
            ].join(' '),
        }

        const qs = new URLSearchParams(options)

        req.params.url = rootURL + '?' + qs.toString()

        next()
    }

    getGoogleOAuthToken = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            const rootURL = 'https://oauth2.googleapis.com/token'

            const values = {
                code: req.query.code as string,
                client_id: config.GOOGLE_CLIENT_ID,
                client_secret: config.GOOGLE_CLIENT_SECRET,
                redirect_uri: config.API_URL + GOOGLE_REDIRECT,
                grant_type: 'authorization_code',
            }

            const qs = new URLSearchParams(values)

            const { data } = await axios.post<GoogleTokensResult>(
                rootURL,
                qs.toString(),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            )

            req.params.token = data.id_token

            next()
        } catch (error) {
            next(error)
        }
    }

    checkGoogleAuth = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const googleUser = decodeToken(req.params.token)

            if (!googleUser?.email) {
                throw new this.HttpError(400, 'An Error was ocurred')
            }

            const user = await db.user.findUnique({
                where: {
                    email: googleUser.email,
                },
            })

            if (!user) {
                if (!googleUser.email_verified)
                    throw new this.HttpError(401, 'Google email not verified')

                const newUser = await db.user.create({
                    data: {
                        firstName: googleUser.given_name,
                        lastName: googleUser.family_name,
                        picture: googleUser.picture,
                        email: googleUser.email,
                        verificated: true,
                        google: true,
                    },
                })

                const token = signToken(newUser)

                res.cookie('token', token, COOKIE_OPTIONS)

                req.body.user = newUser
            } else {
                if (!user.google) {
                    throw new this.HttpError(
                        401,
                        'An existing account was created with this email, without google authentication. If you have forgotten your password, please send a recovery email.'
                    )
                }

                const token = signToken(user)

                res.cookie('token', token, COOKIE_OPTIONS)
            }

            next()
        } catch (error) {
            next(error)
        }
    }
}

export default new AuthMiddlewares()

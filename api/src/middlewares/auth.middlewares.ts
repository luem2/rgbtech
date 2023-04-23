import type { NextFunction, Request, Response } from 'express'
import type { JwtPayload } from 'jsonwebtoken'

import bcrypt from 'bcrypt'

import { db } from '../database'
import { verifyToken } from '../helpers/generateToken'
import { createUserSchema, createUserSchemaWithGoogle } from '../schemas'
import { DEFAULT_AVATAR, PICTURES } from '../helpers/constants'
import { writeNewFile } from '../helpers/fsFunctions'
import { generateFileName } from '../helpers/filename'
import { HttpError } from '../helpers/customError'

import { validateSchemaInsideMiddleware } from '.'

export class AuthMiddlewares {
    public HttpError: typeof HttpError

    constructor() {
        this.HttpError = HttpError
    }

    checkAuth = async (req: Request, _res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ').pop()

        if (token) {
            const tokenData = await verifyToken(token)

            if (tokenData) {
                req.userId = (tokenData as JwtPayload).id
                next()
            } else {
                next(new this.HttpError(401, 'Invalid Token'))
            }
        } else {
            next(new this.HttpError(404, 'Token not Found'))
        }
    }

    checkAdminAuth = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const token = req.headers.authorization?.split(' ').pop()

        if (token) {
            const tokenData = await verifyToken(token)

            if (!tokenData) {
                next(new this.HttpError(401, 'Invalid Token (maybe expired)'))

                return
            }

            const userData = await db.user.findUnique({
                where: {
                    id: (tokenData as JwtPayload).id,
                },
            })

            if (userData?.role !== 'ADMIN') {
                next(
                    new this.HttpError(
                        401,
                        'You are not authorized to access this resource'
                    )
                )

                return
            }

            next()
        } else {
            next(new this.HttpError(404, 'Token not found'))
        }
    }

    checkRegisterBody = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        if (req.body.google) {
            const userSchemaGoogle = await validateSchemaInsideMiddleware(
                createUserSchemaWithGoogle,
                req
            )

            if (!userSchemaGoogle.valid) {
                next(new this.HttpError(401, userSchemaGoogle.err as string))

                return
            }
        } else {
            const userSchema = await validateSchemaInsideMiddleware(
                createUserSchema,
                req
            )

            if (!userSchema.valid) {
                next(new this.HttpError(401, userSchema.err as string))

                return
            }

            if (!req.file) {
                req.body.picture = DEFAULT_AVATAR
            } else {
                const fileName = generateFileName(req.file)

                writeNewFile(req.file, {
                    fileName,
                    nameFolder: PICTURES,
                })

                req.body.picture = fileName
            }
        }

        const userExists = await db.user.findUnique({
            where: {
                email: req.body.email,
            },
        })

        if (userExists) {
            next(
                new this.HttpError(
                    401,
                    'A user has already registered with the email address entered'
                )
            )

            return
        }

        next()
    }

    checkLoginBody = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        if (!req.body.email) {
            next(new this.HttpError(404, 'Email field missing'))

            return
        }

        const user = await db.user.findUnique({
            where: {
                email: req.body.email,
            },
        })

        if (!user) {
            next(new this.HttpError(404, 'User not found'))

            return
        }
        if (!user.google) {
            if (!req.body.password) {
                next(new this.HttpError(404, 'Password field missing'))

                return
            }

            const verificatedPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )

            if (!verificatedPassword) {
                next(
                    new this.HttpError(
                        401,
                        'Password entered is incorrect, try again or recover it'
                    )
                )

                return
            }
        }

        if (!user.verificated) {
            next(new this.HttpError(401, 'You have not verified your email'))

            return
        }

        req.body = user

        next()
    }

    userIsAlreadyConfirmed = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const user = await db.user.findUnique({
            where: {
                id: req.params.id,
            },
            select: {
                verificated: true,
            },
        })

        if (user?.verificated) {
            next(new this.HttpError(401, 'The account is already confirmed'))

            return
        }

        next()
    }
}

export default new AuthMiddlewares()

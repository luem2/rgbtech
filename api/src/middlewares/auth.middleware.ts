import type { NextFunction, Request, Response } from 'express'
import type { JwtPayload } from 'jsonwebtoken'

import bcrypt from 'bcrypt'

import { db } from '../database'
import { verifyToken } from '../helpers/generateToken'
import { validateSchemaInsideMiddleware } from '../helpers/validateRequest'
import { createUserSchema, createUserSchemaWithGoogle } from '../helpers/dto'
import { defaultAvatar } from '../helpers/constants'

class AuthMiddlewares {
    async checkAuth(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ').pop()

        if (token) {
            const tokenData = await verifyToken(token)

            if (tokenData) {
                req.userId = (tokenData as JwtPayload).id
                next()
            } else {
                res.status(401).send({
                    status: 'Error',
                    msg: 'Invalid Token',
                })
            }
        } else {
            res.status(404).send({
                status: 'Error',
                msg: 'Token not found',
            })
        }
    }

    async checkAdminAuth(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ').pop()

        if (token) {
            const tokenData = await verifyToken(token)

            if (!tokenData)
                return res.status(401).send({
                    status: 'Error',
                    msg: 'Invalid Token (maybe expired)',
                })

            const userData = await db.user.findUnique({
                where: {
                    id: (tokenData as JwtPayload).id,
                },
            })

            userData?.role !== 'ADMIN'
                ? res.status(401).send({
                      status: 'Error',
                      msg: 'You are not authorized to access this resource',
                  })
                : next()
        } else {
            res.status(404).send({
                status: 'Error',
                msg: 'Token not found',
            })
        }
    }

    async checkRegisterBody(req: Request, res: Response, next: NextFunction) {
        if (req.body.google) {
            const userSchemaGoogle = await validateSchemaInsideMiddleware(
                createUserSchemaWithGoogle,
                req
            )

            if (!userSchemaGoogle.valid)
                return res.status(401).send({
                    status: 'Error',
                    msg: userSchemaGoogle.err,
                })
        } else {
            const userSchema = await validateSchemaInsideMiddleware(
                createUserSchema,
                req
            )

            if (!userSchema.valid)
                return res.status(401).send({
                    status: 'Error',
                    msg: userSchema.err,
                })

            if (!req.file) {
                req.body.picture = defaultAvatar
            } else {
                req.body.picture = req.file?.filename
            }
        }

        const userExists = await db.user.findUnique({
            where: {
                email: req.body.email,
            },
        })

        if (userExists)
            return res.status(401).send({
                status: 'Error',
                msg: 'A user has already registered with the email address entered',
            })

        next()
    }

    async checkLoginBody(req: Request, res: Response, next: NextFunction) {
        if (!req.body.email)
            return res.status(404).send({
                status: 'Error',
                msg: 'Email field missing',
            })

        const user = await db.user.findUnique({
            where: {
                email: req.body.email,
            },
        })

        if (!user)
            return res.status(404).send({
                status: 'Error',
                msg: 'User not found',
            })

        if (!user.google) {
            if (!req.body.password)
                return res.status(404).send({
                    status: 'Error',
                    msg: 'Password field missing',
                })

            const verificatedPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )

            if (!verificatedPassword)
                return res.status(401).send({
                    status: 'Error',
                    msg: 'Password entered is incorrect, try again or recover it',
                })
        }

        if (!user.verificated)
            return res.status(401).send({
                status: 'Error',
                msg: 'You have not verified your email',
            })

        req.body = user

        next()
    }

    async userIsAlreadyConfirmed(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const user = await db.user.findUnique({
            where: {
                id: req.params.id,
            },
            select: {
                verificated: true,
            },
        })

        if (user?.verificated)
            return res.status(401).send({
                status: 'Error',
                msg: 'The account is already confirmed',
            })

        next()
    }
}

export default new AuthMiddlewares()

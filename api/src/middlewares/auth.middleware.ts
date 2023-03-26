import type { NextFunction, Request, Response } from 'express'
import type { JwtPayload } from 'jsonwebtoken'

import { db } from '../database'
import { verifyToken } from '../helpers/generateToken'

class AuthMiddlewares {
    async checkAuth(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
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

    async checkAdminAuth(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const token = req.headers.authorization?.split(' ').pop()

        if (token) {
            const tokenData = await verifyToken(token)

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

    async checkUserExists(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
        const userExists = await db.user.findUnique({
            where: {
                email: req.body.email,
            },
        })

        if (userExists) {
            return res.status(401).send({
                status: 'Error',
                msg: 'The User already exists',
            })
        }

        next()
    }

    async checkUserEmailVerificated(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
        const user = await db.user.findUnique({
            where: {
                email: req.body.email,
            },
            select: {
                verificated: true,
            },
        })

        if (!user?.verificated)
            return res.status(401).send({
                status: 'Error',
                msg: 'You have not verified your email',
            })

        next()
    }

    async checkEmailExists(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
        const user = await db.user.findUnique({
            where: {
                email: req.body.email,
            },
            select: {
                email: true,
            },
        })

        if (!user?.email)
            return res.status(404).send({
                status: 'Error',
                msg: 'Email not found',
            })

        next()
    }
}

export default new AuthMiddlewares()

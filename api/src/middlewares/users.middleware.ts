import type { User } from '@prisma/client'
import type { NextFunction, Request, Response } from 'express'
import type multer from 'multer'

import { compare } from 'bcrypt'

import { db } from '../database'

class UsersMiddlewares {
    async checkUserEmailUpdateProfile(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const user = await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                email: true,
            },
        })

        if ((user as User).email === req.body.email) {
            next()
        }

        const otherUser = await db.user.findUnique({
            where: {
                email: req.body.email,
            },
        })

        if (otherUser) {
            res.status(401).send({
                status: 'Error',
                msg: 'A user has already registered with the email address entered',
            })
        } else {
            next()
        }
    }

    async checkUserOldPassword(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
        const user = (await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                password: true,
            },
        })) as User

        const passwordMatches = await compare(
            req.body.oldPassword,
            user.password
        )

        if (!passwordMatches) {
            return res.status(401).send({
                status: 'Error',
                msg: 'The sent password does not match the current password',
            })
        }

        next()
    }

    filePhotoProfileFilter(
        _req: Request,
        file: Express.Multer.File,
        cb: multer.FileFilterCallback
    ): void {
        const mimeTypesAccepted = ['image/png', 'image/jpeg', 'image/jpg']

        if (mimeTypesAccepted.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('Only PNG, JPEG and JPG files are allowed'))
        }
    }

    async itemAlreadyExistsInCart(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
        const user = await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                shoppingCart: true,
            },
        })

        const itemRepeated = user?.shoppingCart.find(
            ({ productId }) => productId === req.body.productId
        )

        if (itemRepeated) {
            return res.status(401).send({
                status: 'Error',
                msg: 'The item is already in the cart',
            })
        } else next()
    }

    itemQuantityCannotBeNullOrNegative(
        req: Request,
        res: Response,
        next: NextFunction
    ): Response<unknown, Record<string, unknown>> | undefined {
        if (!req.body.quantity || !Object.keys(req.body.quantity).length) {
            return res.status(401).send({
                status: 'Error',
                msg: 'Has not defined an amount',
            })
        }

        if (req.body.quantity.set <= 0) {
            return res.status(401).send({
                status: 'Error',
                msg: 'The amount cannot be negative, null or undefined',
            })
        }

        next()
    }

    async shoppingCartIsAlreadyEmpty(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
        const user = await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                shoppingCart: true,
            },
        })

        if (!user?.shoppingCart.length) {
            return res.status(401).send({
                status: 'Error',
                msg: 'The shopping cart is already empty',
            })
        } else next()
    }

    async itemNotFoundInsideCart(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
        const user = await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                shoppingCart: true,
            },
        })

        const product = user?.shoppingCart.find(
            ({ productId }) => productId === req.params.productId
        )

        if (!product) {
            return res.status(401).send({
                status: 'Error',
                msg: 'Product not found inside cart',
            })
        } else next()
    }
}

// Google Middlewares

export default new UsersMiddlewares()

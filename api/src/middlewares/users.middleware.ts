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
    ) {
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
    ) {
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
    ) {
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
    ) {
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

    async itemAlreadyExistsInFavorites(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const user = await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                favorites: true,
            },
        })

        const itemRepeated = user?.favorites.find(
            ({ productId }) => productId === req.body.productId
        )

        if (itemRepeated) {
            return res.status(401).send({
                status: 'Error',
                msg: 'The item is already in the favorites',
            })
        } else next()
    }

    itemQuantityCannotBeNullOrNegative(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
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
    ) {
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
    ) {
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

    async favoritesIsAlreadyEmpty(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const user = await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                favorites: true,
            },
        })

        if (!user?.favorites.length) {
            return res.status(401).send({
                status: 'Error',
                msg: `The user's favorites is already empty`,
            })
        } else next()
    }

    async itemNotFoundInsideFavorites(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const user = await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                favorites: true,
            },
        })

        const product = user?.favorites.find(
            ({ productId }) => productId === req.params.productId
        )

        if (!product) {
            return res.status(401).send({
                status: 'Error',
                msg: 'Product not found inside favorites',
            })
        } else next()
    }

    async checkReviewBody(req: Request, res: Response, next: NextFunction) {
        if (!req.body.rating || !req.body.comment) {
            return res.status(400).send({
                status: 'Error',
                msg: 'There are missing fields',
            })
        }

        const user = await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                reviews: true,
            },
        })

        const reviewExists = user?.reviews.find(
            ({ productId }) => productId === req.body.productId
        )

        if (reviewExists) {
            return res.status(401).send({
                status: 'Error',
                msg: 'There is already a review for this product',
            })
        } else next()
    }

    async checkHistoryLength(req: Request, _res: Response, next: NextFunction) {
        const user = await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                history: true,
            },
        })

        if (user?.history.length === 20) {
            const oldestProductVisited = user.history.shift()

            await db.user.update({
                where: {
                    id: req.userId,
                },
                data: {
                    history: {
                        delete: {
                            userId_productId: {
                                userId: req.userId,
                                productId:
                                    oldestProductVisited?.productId as string,
                            },
                        },
                    },
                },
            })
        }

        next()
    }
}

export default new UsersMiddlewares()

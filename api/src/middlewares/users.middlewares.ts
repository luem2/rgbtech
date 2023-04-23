import type { User } from '@prisma/client'
import type { NextFunction, Request, Response } from 'express'

import { compare } from 'bcrypt'

import { db } from '../database'
import { BaseMiddlewares } from '../config/bases'

export class UserMiddlewares extends BaseMiddlewares {
    checkBodyProfileUpdate = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const user = await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                email: true,
            },
        })

        if ((user as User).email !== req.body.email) {
            const otherUser = await db.user.findUnique({
                where: {
                    email: req.body.email,
                },
            })

            if (otherUser) {
                next(
                    new this.HttpError(
                        401,
                        'A user has already registered with the email address entered'
                    )
                )

                return
            }
        }

        next()
    }

    checkBirthDateType = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            if (typeof req.body.birthDate === 'object') {
                req.body.birthDate = req.body.birthDate.toISOString()
            }
            next()
        } catch (error) {
            next(error)
        }
    }

    checkUserOldPassword = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
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
            next(
                new this.HttpError(
                    401,
                    'The sent password does not match the current password'
                )
            )

            return
        }

        next()
    }

    itemAlreadyExistsInCart = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
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
            next(new this.HttpError(401, 'The item is already in the cart'))
        } else next()
    }

    itemAlreadyExistsInFavorites = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
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
            next(
                new this.HttpError(401, 'The item is already in the favorites')
            )
        } else next()
    }

    itemQuantityCannotBeNullOrNegative = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        if (!req.body.quantity || !Object.keys(req.body.quantity).length) {
            next(new this.HttpError(401, 'Has not defined an amount'))

            return
        }

        if (req.body.quantity.set <= 0) {
            next(
                new this.HttpError(
                    401,
                    'The amount cannot be negative, null or undefined'
                )
            )

            return
        }

        next()
    }

    shoppingCartIsAlreadyEmpty = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const user = await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                shoppingCart: true,
            },
        })

        if (!user?.shoppingCart.length) {
            next(new this.HttpError(401, 'The shopping cart is already empty'))
        } else next()
    }

    itemNotFoundInsideCart = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
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
            next(new this.HttpError(401, 'Product not found inside cart'))
        } else next()
    }

    favoritesIsAlreadyEmpty = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const user = await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                favorites: true,
            },
        })

        if (!user?.favorites.length) {
            next(
                new this.HttpError(401, `The user's favorites is already empty`)
            )
        } else next()
    }

    itemNotFoundInsideFavorites = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
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
            next(new this.HttpError(401, 'Product not found inside favorites'))
        } else next()
    }

    checkReviewBody = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        if (!req.body.rating || !req.body.comment) {
            next(new this.HttpError(400, 'There are missing fields'))

            return
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
            next(
                new this.HttpError(
                    401,
                    'There is already a review for this product'
                )
            )
        } else next()
    }

    checkHistoryLength = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
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

    changeUpdateUserAvailability = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const userFinded = await db.user.findUnique({
            where: {
                id: req.params.userId,
            },
        })

        if (!userFinded) {
            next(new this.HttpError(404, `The user doesn't exists`))

            return
        }

        if (typeof req.body.disabled !== 'boolean') {
            next(
                new this.HttpError(
                    400,
                    'The disabled property is required and must be a boolean'
                )
            )

            return
        }

        next()
    }

    checkClaimAward = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        if (!req.query.id) {
            next(new this.HttpError(400, 'The award id is required'))

            return
        }

        const award = await db.award.findUnique({
            where: {
                id: req.query.id as string,
            },
            select: {
                name: true,
                requiredPoints: true,
            },
        })

        if (!award) {
            next(new this.HttpError(404, 'The award not found'))

            return
        }

        const user = await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                RGBpoints: true,
                awards: true,
            },
        })

        if (!user) {
            next(new this.HttpError(404, 'The user not found'))

            return
        }

        const awardFound = user.awards.find(
            (userAward) => userAward.id === req.query.id
        )

        if (awardFound) {
            next(new this.HttpError(401, 'The award is already claimed'))

            return
        }

        if (user.RGBpoints < award.requiredPoints) {
            next(new this.HttpError(401, 'Insufficient RGBPoints'))

            return
        }

        req.body.userPointsUpdated = user.RGBpoints - award.requiredPoints
        req.body.awardClaimed = award

        next()
    }
}

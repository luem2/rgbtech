import type { User } from '@prisma/client'
import type { NextFunction, Request, Response } from 'express'

import { compare } from 'bcrypt'

import { db } from '../database'
import { BaseMiddlewares } from '../config/bases'

export class UserMiddlewares extends BaseMiddlewares {
    checkIfUserAlreadyExists = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            const user = (await db.user.findUnique({
                where: {
                    id: req.userId,
                },
                select: {
                    email: true,
                },
            })) as User

            if (user.email !== req.body.email) {
                const otherUser = await db.user.findUnique({
                    where: {
                        email: req.body.email,
                    },
                })

                if (otherUser)
                    throw new this.HttpError(
                        401,
                        'A user has already registered with the email address entered'
                    )
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
        try {
            const user = (await db.user.findUnique({
                where: {
                    id: req.userId,
                },
                select: {
                    password: true,
                },
            })) as User

            if (!user.password) {
                throw new this.HttpError(
                    401,
                    'The user was registered with google, please login with your google account.'
                )
            }

            if (!req.body.oldPassword)
                throw new this.HttpError(400, 'The old password is required')

            const passwordMatches = await compare(
                req.body.oldPassword,
                user.password
            )

            if (!passwordMatches)
                throw new this.HttpError(
                    401,
                    'The sent password does not match the current password'
                )

            next()
        } catch (error) {
            next(error)
        }
    }

    itemAlreadyExistsInCart = async (
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
                    shoppingCart: true,
                },
            })

            const itemRepeated = user?.shoppingCart.find(
                ({ productId }) => productId === req.body.id
            )

            if (itemRepeated)
                throw new this.HttpError(
                    401,
                    'The product is already in the cart'
                )

            next()
        } catch (error) {
            next(error)
        }
    }

    itemAlreadyExistsInFavorites = async (
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
                    favorites: true,
                },
            })

            const itemRepeated = user?.favorites.find(
                ({ productId }) => productId === req.body.id
            )

            if (itemRepeated)
                throw new this.HttpError(
                    401,
                    'The item is already in the favorites'
                )

            next()
        } catch (error) {
            next(error)
        }
    }

    shoppingCartIsAlreadyEmpty = async (
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
                    shoppingCart: true,
                },
            })

            if (!user?.shoppingCart.length)
                throw new this.HttpError(
                    401,
                    'The shopping cart is already empty'
                )

            next()
        } catch (error) {
            next(error)
        }
    }

    itemNotFoundInsideCart = async (
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
                    shoppingCart: true,
                },
            })

            const product = user?.shoppingCart.find(
                ({ productId }) => productId === req.params.id
            )

            if (!product)
                throw new this.HttpError(401, 'Product not found inside cart')

            next()
        } catch (error) {
            next(error)
        }
    }

    favoritesIsAlreadyEmpty = async (
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
                    favorites: true,
                },
            })

            if (!user?.favorites.length)
                throw new this.HttpError(
                    401,
                    `The user's favorites is already empty`
                )

            next()
        } catch (error) {
            next(error)
        }
    }

    itemNotFoundInsideFavorites = async (
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
                    favorites: true,
                },
            })

            const product = user?.favorites.find(
                ({ productId }) => productId === req.params.id
            )

            if (!product)
                throw new this.HttpError(
                    401,
                    'Product not found inside favorites'
                )

            next()
        } catch (error) {
            next(error)
        }
    }

    checkReviewBody = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            if (!req.body.rating || !req.body.comment)
                throw new this.HttpError(400, 'There are missing fields')

            const user = await db.user.findUnique({
                where: {
                    id: req.userId,
                },
                select: {
                    reviews: true,
                    transactions: {
                        include: {
                            order: {
                                select: {
                                    productId: true,
                                },
                            },
                        },
                    },
                },
            })

            const purchasedProduct = user?.transactions
                .map(({ order }) => order)
                .flat()
                .find(({ productId }) => productId === req.body.id)

            if (!purchasedProduct)
                throw new this.HttpError(
                    401,
                    'The user has not purchased this product yet'
                )

            const reviewExists = user?.reviews.find(
                ({ productId }) => productId === req.body.id
            )

            if (reviewExists)
                throw new this.HttpError(
                    401,
                    'There is already a review for this product'
                )

            next()
        } catch (error) {
            next(error)
        }
    }

    changeUpdateUserAvailability = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            const user = await db.user.findUnique({
                where: {
                    id: req.body.id,
                },
            })

            if (!user) throw new this.HttpError(404, 'User not found')

            if (typeof req.body.disabled !== 'boolean')
                throw new this.HttpError(
                    400,
                    'The disabled property is required and must be a boolean'
                )

            next()
        } catch (error) {
            next(error)
        }
    }

    checkClaimAward = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            const award = await db.award.findUnique({
                where: {
                    id: req.params.id,
                },
                select: {
                    name: true,
                    requiredPoints: true,
                },
            })

            if (!award) throw new this.HttpError(404, 'The award not found')

            const user = await db.user.findUnique({
                where: {
                    id: req.userId,
                },
                select: {
                    RGBpoints: true,
                    awards: true,
                },
            })

            if (!user) throw new this.HttpError(404, 'The user not found')

            const awardClaimed = user.awards.find(
                (userAward) => userAward.id === req.params.id
            )

            if (awardClaimed)
                throw new this.HttpError(401, 'The award is already claimed')

            if (user.RGBpoints < award.requiredPoints)
                throw new this.HttpError(401, 'Insufficient RGBPoints')

            req.body.userPointsUpdated = user.RGBpoints - award.requiredPoints
            req.body.award = award

            next()
        } catch (error) {
            next(error)
        }
    }

    checkIfProductExists = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            const id = req.body.id ?? req.params.id

            const product = await db.product.findUnique({
                where: {
                    id,
                },
            })

            if (!product) throw new this.HttpError(404, 'The product not found')

            next()
        } catch (error) {
            next(error)
        }
    }

    checkProductExistsInCartAndQuantity = async (
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
                    shoppingCart: true,
                },
            })

            const product = user?.shoppingCart.find(
                ({ productId }) => productId === req.params.id
            )

            if (!product)
                throw new this.HttpError(
                    401,
                    'The product is not in the user cart'
                )

            if (!req.body.quantity)
                throw new this.HttpError(401, 'Has not defined an amount')

            if (req.body.quantity <= 0)
                throw new this.HttpError(
                    401,
                    'The amount cannot be negative or null'
                )

            next()
        } catch (error) {
            next(error)
        }
    }

    checkIfHistoryIsAlreadyEmpty = async (
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
                    history: true,
                },
            })

            if (!user?.history.length)
                throw new this.HttpError(
                    401,
                    'The user history is already empty'
                )

            next()
        } catch (error) {
            next(error)
        }
    }

    checkIfUserIsLoggedWithGoogle = async (
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
                    google: true,
                },
            })

            if (user?.google && req.body.email)
                throw new this.HttpError(
                    401,
                    'Cannot change the email, cause this account was logged with google'
                )

            if (user?.google && req.file)
                throw new this.HttpError(
                    401,
                    'Cannot change the profile photo, because you are logged with google'
                )

            next()
        } catch (error) {
            next(error)
        }
    }
}

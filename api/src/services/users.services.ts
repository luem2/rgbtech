import type { Request } from 'express'
import type { User } from '@prisma/client'

import { db } from '../database'
import { AVATARS_PATH } from '../helpers/constants'
import { deleteFile, writeNewFile } from '../helpers/fsFunctions'
import { BaseServices } from '../config/bases'

export class UserServices extends BaseServices {
    async getAllUsers() {
        return await db.user.findMany({
            include: {
                _count: true,
                awards: true,
                country: true,
                favorites: true,
                history: true,
                reviews: true,
                shoppingCart: true,
                transactions: true,
            },
        })
    }

    async updateProfile({ userId, body }: Request) {
        const { nationality, ...bodyUser } = body

        return await db.user.update({
            where: {
                id: userId,
            },
            data: {
                ...bodyUser,
                country: {
                    connect: {
                        id: nationality,
                    },
                },
            },
        })
    }

    async changeProfilePhoto({ userId, file }: Request) {
        if (!file) {
            throw new this.HttpError(401, 'No file provided')
        }

        const user = (await db.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                picture: true,
            },
        })) as User

        deleteFile(user.picture)

        await db.user.update({
            where: {
                id: userId,
            },
            data: {
                picture: writeNewFile(file, AVATARS_PATH),
            },
        })
    }

    async getShoppingCart(id: Request['userId']) {
        return await db.user.findUnique({
            where: {
                id,
            },
            select: {
                shoppingCart: true,
            },
        })
    }

    async addItemToCart({ userId, body }: Request) {
        await db.user.update({
            where: {
                id: userId,
            },
            data: {
                shoppingCart: {
                    create: {
                        productId: body.id,
                        quantity: 1,
                    },
                },
            },
        })
    }

    async modifyItemQuantity({ userId, body, params }: Request) {
        await db.user.update({
            where: {
                id: userId,
            },
            data: {
                shoppingCart: {
                    update: {
                        where: {
                            userId_productId: {
                                userId,
                                productId: params.id,
                            },
                        },
                        data: {
                            quantity: {
                                set: body.quantity,
                            },
                        },
                    },
                },
            },
        })
    }

    async deleteItemFromCart({ userId, params }: Request) {
        await db.user.update({
            where: {
                id: userId,
            },
            data: {
                shoppingCart: {
                    delete: {
                        userId_productId: {
                            userId,
                            productId: params.id,
                        },
                    },
                },
            },
        })
    }

    async cleanShoppingCart(id: Request['userId']) {
        await db.user.update({
            where: {
                id,
            },
            data: {
                shoppingCart: {
                    deleteMany: {},
                },
            },
        })
    }

    async getFavorites(id: Request['userId']) {
        return await db.user.findUnique({
            where: {
                id,
            },
            select: {
                favorites: true,
            },
        })
    }

    async addItemToFavorites({ userId, body }: Request) {
        await db.user.update({
            where: {
                id: userId,
            },
            data: {
                favorites: {
                    create: {
                        productId: body.id,
                    },
                },
            },
        })
    }

    async deleteItemFromFavorites({ userId, params }: Request) {
        await db.user.update({
            where: {
                id: userId,
            },
            data: {
                favorites: {
                    delete: {
                        userId_productId: {
                            userId,
                            productId: params.id,
                        },
                    },
                },
            },
        })
    }

    async cleanFavorites(id: Request['userId']) {
        await db.user.update({
            where: {
                id,
            },
            data: {
                favorites: {
                    deleteMany: {},
                },
            },
        })
    }

    async getReviews(id: Request['userId']) {
        return await db.user.findUnique({
            where: {
                id,
            },
            select: {
                reviews: true,
            },
        })
    }

    async addReview({ userId, body }: Request) {
        await db.user.update({
            where: {
                id: userId,
            },
            data: {
                reviews: {
                    create: {
                        productId: body.id,
                        comment: body.comment,
                        rating: body.rating,
                    },
                },
            },
        })
    }

    async getTransactions(id: Request['userId']) {
        return await db.user.findUnique({
            where: {
                id,
            },
            select: {
                transactions: true,
            },
        })
    }

    async getHistory(id: Request['userId']) {
        return await db.user.findUnique({
            where: {
                id,
            },
            select: {
                history: true,
            },
        })
    }

    async changeUserAvailability({ id, disabled }: Request['body']) {
        return await db.user.update({
            where: {
                id,
            },
            data: {
                disabled,
            },
        })
    }

    async claimAward({ userId, params, body }: Request) {
        return await db.user.update({
            where: {
                id: userId,
            },

            data: {
                awards: {
                    connect: {
                        id: params.id,
                    },
                },

                RGBpoints: body.userPointsUpdated,
            },
        })
    }

    async cleanHistory(id: Request['userId']) {
        await db.user.update({
            where: {
                id,
            },
            data: {
                history: {
                    deleteMany: {},
                },
            },
        })
    }
}

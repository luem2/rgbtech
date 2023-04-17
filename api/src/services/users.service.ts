import type { Request } from 'express'

import { db } from '../database'
import { PICTURES } from '../helpers/constants'
import { deleteOldFile } from '../helpers/fsFunctions'

class UsersServices {
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
        return await db.user.update({
            where: {
                id: userId,
            },
            data: body,
        })
    }

    async changeProfilePhoto({ userId, file }: Request) {
        const user = await db.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                picture: true,
            },
        })

        if (!user) return null

        const oldFileName = user.picture?.split('/').at(-1) as string
        const fileName = (file as Express.Multer.File).filename

        deleteOldFile({
            nameFolder: PICTURES,
            fileName: oldFileName,
        })

        return await db.user.update({
            where: {
                id: userId,
            },
            data: {
                picture: `/uploads/${PICTURES}/${fileName}`,
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
                        productId: body.productId,
                        quantity: 1,
                    },
                },
            },
        })
    }

    async modifyItemQuantity({ userId, body }: Request) {
        const quantity = body.quantity

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
                                productId: body.productId,
                            },
                        },
                        data: {
                            quantity,
                        },
                    },
                },
            },
        })
    }

    async deleteItemFromCart({ userId, params }: Request) {
        const productId = params.productId

        await db.user.update({
            where: {
                id: userId,
            },
            data: {
                shoppingCart: {
                    delete: {
                        userId_productId: {
                            userId,
                            productId,
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
                        productId: body.productId,
                    },
                },
            },
        })
    }

    async deleteItemFromFavorites({ userId, params }: Request) {
        const productId = params.productId

        await db.user.update({
            where: {
                id: userId,
            },
            data: {
                favorites: {
                    delete: {
                        userId_productId: {
                            userId,
                            productId,
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
                        productId: body.productId,
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

    async addLastVisitedToHistory({ userId, body }: Request) {
        await db.user.update({
            where: {
                id: userId,
            },
            data: {
                history: {
                    create: {
                        productId: body.productId,
                    },
                },
            },
        })
    }

    async changeUserAvailability({ params, body }: Request) {
        return await db.user.update({
            where: {
                id: params.userId,
            },
            data: {
                disabled: body.disabled,
            },
        })
    }
}

export default new UsersServices()

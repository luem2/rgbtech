import type { Request } from 'express'

import { db } from '../database'

class UsersServices {
    async updateProfile(req: Request) {
        return await db.user.update({
            where: {
                id: req.userId,
            },
            data: req.body,
        })
    }

    async changeProfilePhoto(req: Request) {
        await db.user.update({
            where: {
                id: req.userId,
            },
            data: {
                picture: req.file?.filename,
            },
        })
    }

    async getShoppingCart(req: Request) {
        return await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                shoppingCart: true,
            },
        })
    }

    async addItemToCart(req: Request) {
        await db.user.update({
            where: {
                id: req.userId,
            },
            data: {
                shoppingCart: {
                    create: {
                        productId: req.body.productId,
                        quantity: 1,
                    },
                },
            },
        })
    }

    async modifyItemQuantity(req: Request) {
        const quantity = req.body.quantity

        await db.user.update({
            where: {
                id: req.userId,
            },
            data: {
                shoppingCart: {
                    update: {
                        where: {
                            userId_productId: {
                                userId: req.userId,
                                productId: req.body.productId,
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

    async deleteItemFromCart(req: Request) {
        const productId = req.params.productId

        await db.user.update({
            where: {
                id: req.userId,
            },
            data: {
                shoppingCart: {
                    delete: {
                        userId_productId: {
                            userId: req.userId,
                            productId,
                        },
                    },
                },
            },
        })
    }

    async cleanShoppingCart(req: Request) {
        await db.user.update({
            where: {
                id: req.userId,
            },
            data: {
                shoppingCart: {
                    deleteMany: {},
                },
            },
        })
    }

    async getFavorites(req: Request) {
        return await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                favorites: true,
            },
        })
    }

    async addItemToFavorites(req: Request) {
        await db.user.update({
            where: {
                id: req.userId,
            },
            data: {
                favorites: {
                    create: {
                        productId: req.body.productId,
                    },
                },
            },
        })
    }

    async deleteItemFromFavorites(req: Request) {
        const productId = req.params.productId

        await db.user.update({
            where: {
                id: req.userId,
            },
            data: {
                favorites: {
                    delete: {
                        userId_productId: {
                            userId: req.userId,
                            productId,
                        },
                    },
                },
            },
        })
    }

    async cleanFavorites(req: Request) {
        await db.user.update({
            where: {
                id: req.userId,
            },
            data: {
                favorites: {
                    deleteMany: {},
                },
            },
        })
    }

    async getUserReviews(req: Request) {
        return await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                reviews: true,
            },
        })
    }

    async addReview(req: Request) {
        await db.user.update({
            where: {
                id: req.userId,
            },
            data: {
                reviews: {
                    create: {
                        productId: req.body.productId,
                        comment: req.body.comment,
                        rating: req.body.rating,
                    },
                },
            },
        })
    }

    async getTransactions(req: Request) {
        return await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                transactions: true,
            },
        })
    }

    async getHistory(req: Request) {
        return await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                history: true,
            },
        })
    }

    async addLastVisitedToHistory(req: Request) {
        await db.user.update({
            where: {
                id: req.userId,
            },
            data: {
                history: {
                    create: {
                        productId: req.body.productId,
                    },
                },
            },
        })
    }
}

export default new UsersServices()

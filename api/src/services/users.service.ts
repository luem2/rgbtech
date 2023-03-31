import type { Request } from 'express'
import type {
    Favorites,
    HistoryProduct,
    ItemCart,
    Review,
    Transactions,
    User,
} from '@prisma/client'

import { db } from '../database'

class UsersServices {
    async getAllUsers(): Promise<User[]> {
        return await db.user.findMany()
    }

    async updateProfile(req: Request): Promise<User> {
        return await db.user.update({
            where: {
                id: req.userId,
            },
            data: req.body,
        })
    }

    async changeProfilePhoto(req: Request): Promise<void> {
        await db.user.update({
            where: {
                id: req.userId,
            },
            data: {
                picture: req.file?.filename,
            },
        })
    }

    async getShoppingCart(req: Request): Promise<{
        shoppingCart: ItemCart[]
    } | null> {
        return await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                shoppingCart: true,
            },
        })
    }

    async addItemToCart(req: Request): Promise<void> {
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

    async modifyItemQuantity(req: Request): Promise<void> {
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

    async deleteItemFromCart(req: Request): Promise<void> {
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

    async cleanShoppingCart(req: Request): Promise<void> {
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

    async getFavorites(req: Request): Promise<{
        favorites: Favorites[]
    } | null> {
        return await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                favorites: true,
            },
        })
    }

    async addItemToFavorites(req: Request): Promise<void> {
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

    async deleteItemFromFavorites(req: Request): Promise<void> {
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

    async cleanFavorites(req: Request): Promise<void> {
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

    async getUserReviews(req: Request): Promise<{
        reviews: Review[]
    } | null> {
        return await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                reviews: true,
            },
        })
    }

    async addReview(req: Request): Promise<void> {
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

    async getTransactions(req: Request): Promise<{
        transactions: Transactions[]
    } | null> {
        return await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                transactions: true,
            },
        })
    }

    async getHistory(req: Request): Promise<{
        history: HistoryProduct[]
    } | null> {
        return await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                history: true,
            },
        })
    }

    async addLastVisitedToHistory(req: Request): Promise<void> {
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

import type { Request } from 'express'
import type { ItemCart, User } from '@prisma/client'

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
}

// favorites GET - PUT - POST - DELETE

// review GET - POST

// shoppingHistory (SALES) - GET

// lastVisited (PRODUCTS HISTORY) - GET - POST

export default new UsersServices()

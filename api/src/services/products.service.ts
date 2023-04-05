import type { Request } from 'express'

import { db } from '../database'

class ProductsServices {
    async getAllProducts(req: Request) {
        console.log('req.query', req.query)

        if (req.userRole !== 'ADMIN') {
            return await db.product.findMany({
                where: {
                    disabled: {
                        not: true,
                    },
                },
                select: {
                    _count: {
                        select: {
                            usersFavorite: true,
                            reviews: true,
                            tags: true,
                        },
                    },
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    specifications: true,
                    picture: true,
                    stock: true,
                    onDiscount: true,
                    discountPercentage: true,
                    freeShipping: true,
                    rating: true,

                    tags: true,
                    brand: true,
                    reviews: true,
                },
            })
        } else
            return await db.product.findMany({
                include: {
                    _count: true,
                    brand: true,
                    reviews: true,
                    shoppingCarts: true,
                    tags: true,
                    transactions: true,
                    usersFavorite: true,
                    usersHistory: true,
                },
            })
    }

    async getProduct(req: Request) {
        if (req.userRole !== 'ADMIN') {
            return await db.product.findFirst({
                where: {
                    id: req.params.productId,
                    AND: {
                        disabled: {
                            not: true,
                        },
                    },
                },
                select: {
                    _count: {
                        select: {
                            usersFavorite: true,
                            reviews: true,
                            tags: true,
                        },
                    },
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    specifications: true,
                    picture: true,
                    stock: true,
                    onDiscount: true,
                    discountPercentage: true,
                    freeShipping: true,
                    rating: true,

                    tags: true,
                    brand: true,
                    reviews: true,
                },
            })
        } else {
            return await db.product.findUnique({
                where: {
                    id: req.params.productId,
                },
                include: {
                    _count: true,
                    brand: true,
                    reviews: true,
                    shoppingCarts: true,
                    tags: true,
                    transactions: true,
                    usersFavorite: true,
                    usersHistory: true,
                },
            })
        }
    }

    async productUpdate(req: Request) {
        return await db.product.update({
            where: {
                id: req.params.productId,
            },
            data: req.body,
        })
    }

    async addProduct(req: Request) {
        return await db.product.create({
            data: req.body,
        })
    }

    async changeProductAvailability(req: Request) {
        return await db.product.update({
            where: {
                id: req.params.productId,
            },
            data: {
                disabled: req.body.disabled,
            },
        })
    }
}

export default new ProductsServices()

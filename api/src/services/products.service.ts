import type { Prisma } from '@prisma/client'
import type { Request } from 'express'

import { db } from '../database'

class ProductsServices {
    readonly userInfoSelectedToSubmit: Prisma.ProductSelect = {
        _count: {
            select: {
                usersFavorite: true,
                reviews: true,
                tags: true,
                transactions: true,
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
    }

    readonly adminInfoIncludedToSubmit: Prisma.ProductInclude = {
        _count: true,
        brand: true,
        reviews: true,
        shoppingCarts: true,
        tags: true,
        transactions: true,
        usersFavorite: true,
        usersHistory: true,
    }

    async getAllProducts({ userRole }: Request) {
        if (userRole !== 'ADMIN') {
            return await db.product.findMany({
                where: {
                    disabled: {
                        not: true,
                    },
                },
                select: this.userInfoSelectedToSubmit,
            })
        } else
            return await db.product.findMany({
                include: this.adminInfoIncludedToSubmit,
            })
    }

    async getQueryProducts({ query, userRole }: Request) {
        const queryObject = query as Record<string, string>
        const queryParams = new URLSearchParams(queryObject)

        const queryProductsFilter: Prisma.ProductWhereInput = {
            brand: {
                name: queryObject.brand
                    ? {
                          equals: queryParams.get('brand') as string,
                          mode: 'insensitive',
                      }
                    : undefined,
            },

            name: queryObject.name
                ? {
                      contains: queryParams.get('name') as string,
                      mode: 'insensitive',
                  }
                : undefined,

            price: queryObject.price
                ? {
                      gte: Number(queryParams.get('greaterThan')),
                      lte: Number(queryParams),
                  }
                : undefined,

            rating: queryObject.rating
                ? {
                      //   lte: 5,
                      //   gte: 2,
                      //   equals: 5,
                  }
                : undefined,

            tags: {
                every: {
                    name: queryObject.tags
                        ? {
                              in: queryParams.getAll('tags'),
                              mode: 'insensitive',
                          }
                        : undefined,
                },
            },

            stock: queryObject.stock
                ? {
                      // gte: 2,
                      // lte: 2,
                  }
                : undefined,

            onDiscount: {
                equals: queryObject.onDiscount
                    ? JSON.parse(queryParams.get('onDiscount') as string)
                    : undefined,
            },

            freeShipping: {
                equals: queryObject.freeShipping
                    ? JSON.parse(queryObject.freeShipping)
                    : undefined,
            },

            disabled:
                userRole !== 'ADMIN'
                    ? {
                          equals: false,
                      }
                    : undefined,
        }

        return await db.product.findMany({
            where: queryProductsFilter,
            // orderBy: {},
            // select: userRole !== 'ADMIN' ? this.userInfoSelectedToSubmit : undefined,
            // include: userRole === 'ADMIN' ? this.adminInfoIncludedToSubmit : undefined,
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

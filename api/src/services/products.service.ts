import type { Prisma } from '@prisma/client'
import type { Request } from 'express'
import type { IQueryParams, ProductSchema } from '../types'

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

    async getQueryProducts({ parsedQuery, userRole }: Request) {
        const queryParams: IQueryParams = parsedQuery

        const wherePrismaFilter: Prisma.ProductWhereInput = {
            brand: {
                name: this.isNotEmpty(queryParams.brand)
                    ? {
                          equals: queryParams.brand,
                          mode: 'insensitive',
                      }
                    : undefined,
            },

            name: this.isNotEmpty(queryParams.name)
                ? {
                      contains: queryParams.name,
                      mode: 'insensitive',
                  }
                : undefined,

            price: this.isNotEmpty(queryParams.price)
                ? {
                      gte: queryParams.price?.greaterThan,
                      lte: queryParams.price?.lessThan,
                  }
                : undefined,

            rating: this.isNotEmpty(queryParams.rating)
                ? {
                      lte: queryParams.rating?.lessThan,
                      gte: queryParams.rating?.greaterThan,
                      equals: queryParams.rating?.equals,
                  }
                : undefined,

            tags: {
                every: {
                    name: queryParams.tags?.length
                        ? {
                              in: queryParams.tags,
                              mode: 'insensitive',
                          }
                        : undefined,
                },
            },

            stock: this.isNotEmpty(queryParams.stock)
                ? {
                      gte: queryParams.stock?.greaterThan,
                      lte: queryParams.stock?.lessThan,
                  }
                : undefined,

            onDiscount: {
                equals: queryParams.onDiscount,
            },

            freeShipping: {
                equals: queryParams.freeShipping,
            },
        }

        const orderByPrismaFilter: Prisma.ProductOrderByWithRelationInput = {
            brand: {
                name:
                    queryParams.orderBy?.value === 'brand'
                        ? queryParams.orderBy.order
                        : undefined,
            },
            name:
                queryParams.orderBy?.value === 'name'
                    ? queryParams.orderBy.order
                    : undefined,
            price:
                queryParams.orderBy?.value === 'price'
                    ? queryParams.orderBy.order
                    : undefined,
            rating:
                queryParams.orderBy?.value === 'rating'
                    ? queryParams.orderBy.order
                    : undefined,
            stock:
                queryParams.orderBy?.value === 'stock'
                    ? queryParams.orderBy.order
                    : undefined,
        }

        if (userRole === 'ADMIN') {
            return await db.product.findMany({
                where: wherePrismaFilter,
                orderBy: orderByPrismaFilter,
                include: this.adminInfoIncludedToSubmit,
            })
        } else
            return await db.product.findMany({
                where: {
                    ...wherePrismaFilter,
                    disabled: {
                        equals: false,
                    },
                },
                orderBy: orderByPrismaFilter,
                select: this.userInfoSelectedToSubmit,
            })
    }

    isNotEmpty(arg: string | Record<string, unknown> | undefined) {
        if (typeof arg === 'string') {
            return Boolean(arg)
        } else if (typeof arg === 'object') {
            return Boolean(Object.keys(arg).length)
        } else return false
    }

    async getProduct({ userRole, params }: Request) {
        if (userRole !== 'ADMIN') {
            return await db.product.findFirst({
                where: {
                    id: params.productId,
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
                    id: params.productId,
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

    async productUpdate(product: ProductSchema) {
        const { id, ...body } = product

        return await db.product.update({
            where: {
                id,
            },
            data: {
                ...body,
                brand: {
                    connect: {
                        name: product.brand,
                    },
                },
                tags: {
                    connectOrCreate: product.tags.map((tag) => ({
                        where: {
                            name: tag,
                        },
                        create: {
                            name: tag,
                        },
                    })),
                },
            },
        })
    }

    async addProduct(newProduct: Request['body']) {
        const product = newProduct as ProductSchema

        return await db.product.create({
            data: {
                ...product,
                brand: {
                    connect: {
                        name: product.brand,
                    },
                },
                tags: {
                    connectOrCreate: product.tags.map((tag) => ({
                        where: {
                            name: tag,
                        },
                        create: {
                            name: tag,
                        },
                    })),
                },
            },
        })
    }

    async changeProductAvailability({ params, body }: Request) {
        return await db.product.update({
            where: {
                id: params.productId,
            },
            data: {
                disabled: body.disabled,
            },
        })
    }
}

export default new ProductsServices()

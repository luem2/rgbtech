import type { Prisma } from '@prisma/client'
import type { Request } from 'express'
import type { IQueryParams, ProductSchema } from '../types'

import { db } from '../database'
import { deleteFile, writeNewFile } from '../helpers/fsFunctions'
import { CORE } from '../helpers/constants'
import { generateFileName } from '../helpers/generateFileName'

export class ProductServices {
    readonly userInfo: Prisma.ProductSelect
    readonly adminInfo: Prisma.ProductInclude

    constructor() {
        this.userInfo = {
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
        }

        this.adminInfo = {
            _count: true,
            brand: true,
            reviews: true,
            shoppingCarts: true,
            tags: true,
            usersFavorite: true,
            usersHistory: true,
        }
    }

    async getAllProducts(userRole: Request['userRole']) {
        if (userRole !== 'ADMIN') {
            return await db.product.findMany({
                where: {
                    disabled: {
                        not: true,
                    },
                },
                select: this.userInfo,
            })
        } else
            return await db.product.findMany({
                include: this.adminInfo,
            })
    }

    async getQueryProducts({ query, userRole }: Request) {
        const queryParams = query as IQueryParams

        const filters: Prisma.ProductWhereInput = {
            brand: {
                name: query.brand?.length
                    ? {
                          equals: queryParams.brand,
                          mode: 'insensitive',
                      }
                    : undefined,
            },

            name: queryParams.name?.length
                ? {
                      contains: queryParams.name,
                      mode: 'insensitive',
                  }
                : undefined,

            price: {
                gte: queryParams.price_gte ?? undefined,
                lte: queryParams.price_lte ?? undefined,
            },

            rating: {
                gte: queryParams.rating_gte ?? undefined,
                lte: queryParams.rating_lte ?? undefined,
                equals: queryParams.rating ?? undefined,
            },

            tags: {
                some: {
                    name: queryParams.tag
                        ? { equals: queryParams.tag, mode: 'insensitive' }
                        : undefined,
                },
            },

            onDiscount: {
                equals: queryParams.onDiscount,
            },

            freeShipping: {
                equals: queryParams.freeShipping,
            },
        }

        const order: Prisma.ProductOrderByWithRelationInput = {
            brand: {
                name:
                    queryParams.sortBy === 'brand'
                        ? queryParams.sortOrder
                        : undefined,
            },
            name:
                queryParams.sortBy === 'name'
                    ? queryParams.sortOrder
                    : undefined,
            price:
                queryParams.sortBy === 'price'
                    ? queryParams.sortOrder
                    : undefined,
            rating:
                queryParams.sortBy === 'rating'
                    ? queryParams.sortOrder
                    : undefined,
            stock:
                queryParams.sortBy === 'stock'
                    ? queryParams.sortOrder
                    : undefined,
        }

        if (userRole === 'ADMIN') {
            return await db.product.findMany({
                where: filters,
                orderBy: order,
                include: this.adminInfo,
            })
        } else
            return await db.product.findMany({
                where: {
                    ...filters,
                    disabled: {
                        equals: false,
                    },
                },
                orderBy: order,
                select: this.userInfo,
            })
    }

    async getProduct({ userRole, params }: Request) {
        if (userRole !== 'ADMIN') {
            return await db.product.findFirst({
                where: {
                    id: params.id,
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
                    id: params.id,
                },
                include: {
                    _count: true,
                    brand: true,
                    reviews: true,
                    shoppingCarts: true,
                    tags: true,
                    usersFavorite: true,
                    usersHistory: true,
                },
            })
        }
    }

    async productUpdate({ params, body }: Request) {
        return await db.product.update({
            where: {
                id: params.id,
            },
            data: {
                ...body,
                brand: {
                    connect: {
                        name: body.brand,
                    },
                },
                tags: {
                    connectOrCreate: body.tags.map((tag: string) => ({
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

    async productPictureUpdate({ file, query }: Request) {
        const fileName = generateFileName(file)

        writeNewFile(file, {
            nameFolder: CORE,
            fileName,
        })

        return await db.product.update({
            where: {
                id: query.id as string,
            },
            data: {
                picture: `/uploads/${CORE}/${fileName}`,
            },
        })
    }

    async addProduct(newProduct: ProductSchema) {
        return await db.product.create({
            data: {
                ...newProduct,
                brand: {
                    connect: {
                        name: newProduct.brand,
                    },
                },
                tags: {
                    connectOrCreate: newProduct.tags.map((tag) => ({
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
                id: params.id,
            },
            data: {
                disabled: body.disabled,
            },
        })
    }

    async deleteProduct({ id }: Request['params']) {
        const product = (await db.product.findUnique({
            where: {
                id,
            },
            select: {
                picture: true,
            },
        })) as {
            picture: string
        }

        const fileName = product.picture.split('/').pop() as string

        deleteFile({
            nameFolder: CORE,
            fileName,
        })

        return await db.product.delete({
            where: {
                id,
            },
        })
    }
}

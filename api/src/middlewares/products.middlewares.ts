import type { Request, Response, NextFunction } from 'express'
import type { ProductSchema } from '../types'

import { db } from '../database'
import { verifyToken } from '../helpers/generateToken'
import { BaseMiddlewares } from '../config/bases'

export class ProductMiddlewares extends BaseMiddlewares {
    checkIfUserIsLogged = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            const { token } = req.cookies

            if (token) {
                const tokenData = verifyToken(token)

                req.userId = tokenData.id
                req.userRole = tokenData.role
            }

            next()
        } catch (error) {
            next(error)
        }
    }

    checkBodyAddProduct = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            const product = await db.product.findUnique({
                where: {
                    name: req.body.name,
                },
            })

            if (product)
                throw new this.HttpError(400, 'The product already exists')

            if (!req.file)
                throw new this.HttpError(
                    401,
                    'The product needs an image to be added'
                )

            next()
        } catch (error) {
            next(error)
        }
    }

    checkBodyEditProduct = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            if (req.body.picture)
                throw new this.HttpError(
                    400,
                    'This endpoint can not change the picture'
                )

            const product = await db.product.findUnique({
                where: {
                    id: req.params.id,
                },
            })

            if (!product) throw new this.HttpError(404, 'Product not found')

            if (product.name !== req.body.name) {
                const otherProduct = await db.product.findUnique({
                    where: {
                        name: req.body.name,
                    },
                })

                if (otherProduct)
                    throw new this.HttpError(400, 'The product already exists')
            }

            next()
        } catch (error) {
            next(error)
        }
    }

    checkBrandAndTags = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            const product = req.body as ProductSchema

            const brand = await db.brand.findUnique({
                where: {
                    name: product.brand,
                },
            })

            if (!brand)
                throw new this.HttpError(401, 'The brand does not exists')

            product.tags.forEach((tag) => {
                if (tag.length < 2)
                    throw new this.HttpError(
                        401,
                        'The tag must have at least 2 letters'
                    )
            })

            req.body.tags = product.tags.map(
                (tag) => tag[0].toUpperCase() + tag.slice(1).toLowerCase()
            )

            next()
        } catch (error) {
            next(error)
        }
    }

    checkUpdateProductAvailability = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            if (typeof req.body.disabled !== 'boolean')
                throw new this.HttpError(
                    401,
                    'The disabled property must be a boolean'
                )

            next()
        } catch (error) {
            next(error)
        }
    }

    checkQuerySchema = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            if (Object.keys(req.query).length) {
                if (req.query.sortBy && !req.query.sortOrder)
                    throw new this.HttpError(
                        401,
                        'The sortOrder property is needed, if you want sort the results'
                    )

                if (
                    req.query.rating &&
                    (req.query.rating_gte ?? req.query.rating_lte)
                )
                    throw new this.HttpError(
                        401,
                        'The rating property can not coexist with gte or lte properties'
                    )
            }

            next()
        } catch (error) {
            next(error)
        }
    }

    checkUpdatePictureProduct = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            const product = await db.product.findUnique({
                where: {
                    id: req.params.id,
                },
                select: {
                    picture: true,
                },
            })

            if (!product) throw new this.HttpError(404, 'Product not found')

            if (!req.file)
                throw new this.HttpError(401, 'The new product image is needed')

            req.body.oldFile = product.picture

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
            const product = await db.product.findUnique({
                where: {
                    id: req.params.id,
                },
            })

            if (!product) throw new this.HttpError(404, 'Product not found')

            if (req.method === 'DELETE') {
                req.body.picture = product.picture
            }

            next()
        } catch (error) {
            next(error)
        }
    }

    ifUserLoggedPushToHistory = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        if (req.userId) {
            const pathRequest = req.headers.origin?.split('/')

            // TODO: SIMULAR CON FRONTEND PETICION PARA VER EL VALOR DE ORIGIN U ORIGINS.
            console.log('req.headers', req.headers)
            console.log('pathRequest', pathRequest)

            if (!pathRequest?.includes('dashboard')) {
                const user = await db.user.findUnique({
                    where: {
                        id: req.userId,
                    },
                    select: {
                        history: true,
                    },
                })

                if (user?.history.length === 20) {
                    const oldestProductVisited = user.history.shift()

                    await db.user.update({
                        where: {
                            id: req.userId,
                        },
                        data: {
                            history: {
                                create: {
                                    productId: req.params.id,
                                },
                                delete: {
                                    id: oldestProductVisited?.id,
                                },
                            },
                        },
                    })
                } else
                    await db.user.update({
                        where: {
                            id: req.userId,
                        },

                        data: {
                            history: {
                                create: {
                                    productId: req.params.id,
                                },
                            },
                        },
                    })
            }
        }
        next()
    }
}

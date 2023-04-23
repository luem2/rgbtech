import type { Request, Response, NextFunction } from 'express'
import type { JwtPayload } from 'jsonwebtoken'
import type { ProductSchema } from '../types'

import { ValidationError } from 'yup'

import { db } from '../database'
import { verifyToken } from '../helpers/generateToken'
import { querySchema } from '../schemas'
import { generateFileName } from '../helpers/filename'
import { writeNewFile } from '../helpers/fsFunctions'
import { CORE } from '../helpers/constants'
import { BaseMiddlewares } from '../config/bases'

import { validateSchemaInsideMiddleware } from '.'

export class ProductMiddlewares extends BaseMiddlewares {
    getProductsAuthMiddleware = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const token = req.headers.authorization?.split(' ').pop()

        if (token) {
            const tokenData = await verifyToken(token)

            if (tokenData) {
                req.userRole = (tokenData as JwtPayload).role
            }
        }

        next()
    }

    checkBodyAddProduct = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const newProduct = req.body as ProductSchema

        if (newProduct.id) {
            next(
                new this.HttpError(400, 'This operation does not require an ID')
            )

            return
        }

        const productFinded = await db.product.findUnique({
            where: {
                name: newProduct.name,
            },
        })

        if (productFinded) {
            next(new this.HttpError(400, 'The product already exists'))

            return
        }

        if (!req.file) {
            next(
                new this.HttpError(
                    401,
                    'The product needs an image to be added'
                )
            )

            return
        }

        const fileName = generateFileName(req.file)

        writeNewFile(req.file, {
            nameFolder: CORE,
            fileName: req.body.picture.split('/').at(-1),
        })

        req.body.picture = `/uploads/core/${fileName}`

        next()
    }

    checkBodyEditProduct = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const product = req.body as ProductSchema

        if (!product.id) {
            next(
                new this.HttpError(
                    400,
                    ' This operation requires the product id'
                )
            )

            return
        }

        if (product.picture) {
            next(
                new this.HttpError(
                    400,
                    'This operation can not change the picture'
                )
            )

            return
        }

        const productFinded = await db.product.findUnique({
            where: {
                id: product.id,
            },
        })

        if (!productFinded) {
            next(new this.HttpError(404, 'Product not found'))

            return
        }

        if (productFinded.name === product.name) {
            next()
        } else {
            const otherProduct = await db.product.findUnique({
                where: {
                    name: product.name,
                },
            })

            if (otherProduct) {
                next(new this.HttpError(400, 'The product already exists'))

                return
            }

            next()
        }
    }

    checkBrandAndTags = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const product = req.body as ProductSchema

        const brandFinded = await db.brand.findUnique({
            where: {
                name: product.brand,
            },
        })

        if (!brandFinded) {
            next(new this.HttpError(401, 'The brand does not exists'))

            return
        }

        product.tags.forEach((tag) => {
            if (tag.length < 2) {
                next(
                    new this.HttpError(
                        401,
                        'The tag must have at least 2 letters'
                    )
                )
            }
        })

        req.body.tags = product.tags.map(
            (tag) => tag[0].toUpperCase() + tag.slice(1)
        )

        next()
    }

    checkUpdateProductAvailability = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const productFinded = await db.product.findUnique({
            where: {
                id: req.params.productId,
            },
        })

        if (!productFinded) {
            next(new this.HttpError(404, 'Product not found'))

            return
        }

        if (typeof req.body.disabled !== 'boolean') {
            next(
                new this.HttpError(
                    401,
                    'The disabled property must be a boolean'
                )
            )

            return
        }

        next()
    }

    checkQueryObjectFilters = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        if (Object.keys(req.query).length) {
            const query = req.query as Record<string, string>
            const parsedQuery: Record<string, unknown> = {}

            for (const key in query) {
                try {
                    parsedQuery[key] = JSON.parse(query[key])
                } catch (e) {
                    parsedQuery[key] = query[key]
                }
            }

            req.parsedQuery = parsedQuery

            const queryValidationSchema = await validateSchemaInsideMiddleware(
                querySchema,
                req
            )

            if (!queryValidationSchema.valid) {
                next(
                    new ValidationError(
                        queryValidationSchema.err as ValidationError
                    )
                )

                return
            }
        }

        next()
    }

    checkUpdatePictureProduct = (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        if (!req.query.id) {
            next(
                new this.HttpError(
                    401,
                    'Product id is needed to perform the operation'
                )
            )

            return
        }

        next()
    }
}

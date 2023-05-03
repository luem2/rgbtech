import type { Request, Response, NextFunction } from 'express'
import type { JwtPayload } from 'jsonwebtoken'
import type { ProductSchema } from '../types'

import { db } from '../database'
import { verifyToken } from '../helpers/generateToken'
import { generateFileName } from '../helpers/generateFileName'
import { deleteFile, writeNewFile } from '../helpers/fsFunctions'
import { CORE } from '../helpers/constants'
import { BaseMiddlewares } from '../config/bases'

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
        const product = await db.product.findUnique({
            where: {
                name: req.body.name,
            },
        })

        if (product) {
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
            fileName,
        })

        req.body.picture = `/uploads/core/${fileName}`

        next()
    }

    checkBodyEditProduct = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        if (req.body.picture) {
            next(
                new this.HttpError(
                    400,
                    'This operation can not change the picture'
                )
            )

            return
        }

        const product = await db.product.findUnique({
            where: {
                id: req.params.id,
            },
        })

        if (!product) {
            next(new this.HttpError(404, 'Product not found'))

            return
        }

        if (product.name !== req.body.name) {
            const otherProduct = await db.product.findUnique({
                where: {
                    name: req.body.name,
                },
            })

            if (otherProduct) {
                next(new this.HttpError(400, 'The product already exists'))

                return
            }
        }

        next()
    }

    checkBrandAndTags = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const product = req.body as ProductSchema

        const brand = await db.brand.findUnique({
            where: {
                name: product.brand,
            },
        })

        if (!brand) {
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
            (tag) => tag[0].toUpperCase() + tag.slice(1).toLowerCase()
        )

        next()
    }

    checkUpdateProductAvailability = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
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

    checkQuerySchema = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        if (Object.keys(req.query).length) {
            if (req.query.sortBy && !req.query.sortOrder) {
                next(
                    new this.HttpError(
                        401,
                        'The sortOrder property is needed to perform the operation'
                    )
                )

                return
            }

            if (
                req.query.rating &&
                (req.query.rating_gte ?? req.query.rating_lte)
            ) {
                next(
                    new this.HttpError(
                        401,
                        'The rating property can not have gte or lte properties'
                    )
                )

                return
            }
        }

        next()
    }

    checkUpdatePictureProduct = async (
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

        const product = await db.product.findUnique({
            where: {
                id: req.query.id as string,
            },
            select: {
                picture: true,
            },
        })

        if (!product) {
            next(new this.HttpError(404, 'Product not found'))

            return
        }

        if (!req.file) {
            next(new this.HttpError(401, 'The new product image is needed'))

            return
        }

        deleteFile({
            nameFolder: CORE,
            fileName: product.picture.split('/').pop() as string,
        })

        next()
    }

    checkIfProductExists = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const product = await db.product.findUnique({
            where: {
                id: req.params.id,
            },
        })

        if (!product) {
            next(new this.HttpError(404, 'Product not found'))

            return
        }

        next()
    }
}

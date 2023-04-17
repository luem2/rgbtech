import type { Request, Response, NextFunction } from 'express'
import type { JwtPayload } from 'jsonwebtoken'
import type { ProductSchema } from '../types'

import { db } from '../database'
import { verifyToken } from '../helpers/generateToken'
import { validateSchemaInsideMiddleware } from '../helpers/validateRequest'
import { querySchema } from '../helpers/dto'
import { generateFileName } from '../helpers/filename'

class ProductsMiddlewares {
    async getProductsAuthMiddleware(
        req: Request,
        _res: Response,
        next: NextFunction
    ) {
        const token = req.headers.authorization?.split(' ').pop()

        if (token) {
            const tokenData = await verifyToken(token)

            if (tokenData) {
                req.userRole = (tokenData as JwtPayload).role
            }
        }

        next()
    }

    async checkBodyAddProduct(req: Request, res: Response, next: NextFunction) {
        const newProduct = req.body as ProductSchema

        if (newProduct.id)
            return res.status(401).send({
                status: 'Error',
                msg: 'This operation does not require an ID',
            })

        const productFinded = await db.product.findUnique({
            where: {
                name: newProduct.name,
            },
        })

        if (productFinded)
            return res.status(401).send({
                status: 'Error',
                msg: 'The product already exists',
            })

        if (!req.file) {
            return res.status(401).send({
                status: 'Error',
                msg: 'The product needs an image',
            })
        }

        const fileName = generateFileName(req.file)

        req.body.picture = `/uploads/core/${fileName}`

        next()
    }

    async checkBodyEditProduct(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const product = req.body as ProductSchema

        if (!product.id)
            return res.status(401).send({
                status: 'Error',
                msg: 'Product id is needed to perform the operation',
            })

        if (product.picture)
            return res.status(401).send({
                status: 'Error',
                msg: 'This operation can not change the picture',
            })

        const productFinded = await db.product.findUnique({
            where: {
                id: product.id,
            },
        })

        if (!productFinded)
            return res.status(404).send({
                status: 'Error',
                msg: 'Product id not found, the product doesnt exists',
            })

        if (productFinded.name === product.name) {
            next()
        } else {
            const otherProduct = await db.product.findUnique({
                where: {
                    name: product.name,
                },
            })

            if (otherProduct)
                return res.status(401).send({
                    status: 'Error',
                    msg: 'The product already exists',
                })

            next()
        }
    }

    async checkBrandAndTags(req: Request, res: Response, next: NextFunction) {
        const product = req.body as ProductSchema

        const brandFinded = await db.brand.findUnique({
            where: {
                name: product.brand,
            },
        })

        if (!brandFinded) {
            return res.status(401).send({
                status: 'Error',
                msg: 'The brand does not exists',
            })
        }

        product.tags.forEach((tag) => {
            if (tag.length < 2)
                return res.status(401).send({
                    status: 'Error',
                    msg: 'The tag must have at least 2 letters',
                })
        })

        req.body.tags = product.tags.map(
            (tag) => tag[0].toUpperCase() + tag.slice(1)
        )

        next()
    }

    async checkUpdateProductAvailability(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const productFinded = await db.product.findUnique({
            where: {
                id: req.params.productId,
            },
        })

        if (!productFinded)
            return res.status(404).send({
                status: 'Error',
                msg: `The product doesn't exists`,
            })

        if (typeof req.body.disabled !== 'boolean')
            return res.status(401).send({
                status: 'Error',
                msg: 'The disabled property is required and must be a boolean',
            })

        next()
    }

    async checkQueryObjectFilters(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
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

            if (!queryValidationSchema.valid)
                return res.status(401).send({
                    status: 'Error',
                    msg: queryValidationSchema.err,
                })
        }
        next()
    }

    checkUpdatePictureProduct(req: Request, res: Response, next: NextFunction) {
        if (!req.query.id)
            return res.status(401).send({
                status: 'Error',
                msg: 'Product id is needed to perform the operation',
            })

        next()
    }
}

export default new ProductsMiddlewares()

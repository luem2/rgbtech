import type { Request, Response, NextFunction } from 'express'
import type { JwtPayload } from 'jsonwebtoken'

import { db } from '../database'
import { verifyToken } from '../helpers/generateToken'

class ProductsMiddlewares {
    async getProductsAuthMiddleware(
        req: Request,
        _res: Response,
        next: NextFunction
    ) {
        const token = req.headers.authorization?.split(' ').pop()

        if (token) {
            const tokenData = await verifyToken(token)

            if (!tokenData) next()
            else {
                req.userRole = (tokenData as JwtPayload).role
            }
        }

        next()
    }

    async checkBodyAddProduct(req: Request, res: Response, next: NextFunction) {
        const productFinded = await db.product.findUnique({
            where: {
                name: req.body.name,
            },
        })

        if (productFinded)
            return res.status(401).send({
                status: 'Error',
                msg: 'The product already exists',
            })

        next()
    }

    async checkBodyEditProduct(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        if (!req.body.id)
            return res.status(401).send({
                status: 'Error',
                msg: 'Product id is needed to perform the operation',
            })

        const productFinded = await db.product.findUnique({
            where: {
                id: req.body.id,
            },
        })

        if (!productFinded)
            return res.status(404).send({
                status: 'Error',
                msg: 'Product id not found, the product doesnt exists',
            })

        if (productFinded.name === req.body.name) {
            next()
        } else {
            const otherProduct = await db.product.findUnique({
                where: {
                    name: req.body.name,
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
}

export default new ProductsMiddlewares()

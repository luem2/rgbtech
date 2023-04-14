import type { NextFunction, Request, Response } from 'express'

import { db } from '../database'

class BrandsMiddlewares {
    async checkBodyAddBrand(req: Request, res: Response, next: NextFunction) {
        const brandFinded = await db.brand.findUnique({
            where: {
                name: req.body.name,
            },
        })

        if (brandFinded)
            return res.status(401).send({
                status: 'Error',
                msg: 'The brand already exists',
            })

        next()
    }

    async checkBodyEditBrand(req: Request, res: Response, next: NextFunction) {
        const brandFinded = await db.brand.findUnique({
            where: {
                name: req.params.name,
            },
        })

        if (!brandFinded)
            return res.status(404).send({
                status: 'Error',
                msg: 'Brand not found',
            })

        if (brandFinded.name === req.body.name) {
            next()
        } else {
            const otherBrand = await db.brand.findUnique({
                where: {
                    name: req.body.name,
                },
            })

            if (otherBrand)
                return res.status(401).send({
                    status: 'Error',
                    msg: 'The brand already exists',
                })

            next()
        }
    }

    async checkUpdateBrandAvailability(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const brandFinded = await db.brand.findUnique({
            where: {
                name: req.params.name,
            },
        })

        if (!brandFinded)
            return res.status(404).send({
                status: 'Error',
                msg: `The brand doesn't exists`,
            })

        if (typeof req.body.disabled !== 'boolean')
            return res.status(401).send({
                status: 'Error',
                msg: 'The disabled property is required and must be a boolean',
            })

        next()
    }
}

export default new BrandsMiddlewares()

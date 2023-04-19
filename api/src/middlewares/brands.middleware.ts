import type { NextFunction, Request, Response } from 'express'

import { db } from '../database'
import { generateFileName } from '../helpers/filename'

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

        if (!req.file)
            return res.status(401).send({
                status: 'Error',
                msg: 'The brand needs an image',
            })

        const fileName = generateFileName(req.file)

        req.body.logo = `/uploads/core/${fileName}`

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

        if (brandFinded.name !== req.body.name) {
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
        }

        if (req.file) {
            const fileName = generateFileName(req.file)

            req.body.oldLogo = brandFinded.logo
            req.body.logo = `/uploads/core/${fileName}`
        }

        next()
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

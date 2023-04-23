import type { NextFunction, Request, Response } from 'express'

import { db } from '../database'
import { generateFileName } from '../helpers/filename'
import { BaseMiddlewares } from '../config/bases'

export class BrandMiddlewares extends BaseMiddlewares {
    checkBodyAddBrand = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const brandFinded = await db.brand.findUnique({
            where: {
                name: req.body.name,
            },
        })

        if (brandFinded) {
            next(new this.HttpError(400, 'The brand already exists'))

            return
        }

        if (!req.file) {
            next(new this.HttpError(400, 'The brand needs an image'))

            return
        }

        const fileName = generateFileName(req.file)

        req.body.logo = `/uploads/core/${fileName}`

        next()
    }

    checkBodyEditBrand = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const brandFinded = await db.brand.findUnique({
            where: {
                name: req.params.name,
            },
        })

        if (!brandFinded) {
            next(new this.HttpError(404, 'Brand not found'))

            return
        }

        if (brandFinded.name !== req.body.name) {
            const otherBrand = await db.brand.findUnique({
                where: {
                    name: req.body.name,
                },
            })

            if (otherBrand) {
                next(new this.HttpError(400, 'The brand already exists'))

                return
            }
        }

        if (req.file) {
            const fileName = generateFileName(req.file)

            req.body.oldLogo = brandFinded.logo
            req.body.logo = `/uploads/core/${fileName}`
        }

        next()
    }

    checkUpdateBrandAvailability = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const brandFinded = await db.brand.findUnique({
            where: {
                name: req.params.name,
            },
        })

        if (!brandFinded) {
            next(new this.HttpError(404, 'Brand not found'))

            return
        }

        if (typeof req.body.disabled !== 'boolean') {
            next(
                new this.HttpError(
                    400,
                    'The disabled property is required and must be a boolean'
                )
            )

            return
        }

        next()
    }
}

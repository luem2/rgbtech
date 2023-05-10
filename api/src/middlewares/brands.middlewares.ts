import type { NextFunction, Request, Response } from 'express'
import type { Brand } from '@prisma/client'

import { db } from '../database'
import { BaseMiddlewares } from '../config/bases'

export class BrandMiddlewares extends BaseMiddlewares {
    checkBodyAddBrand = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            const brand = await db.brand.findUnique({
                where: {
                    name: req.body.name,
                },
            })

            if (brand) throw new this.HttpError(400, 'The brand already exists')

            if (!req.file)
                throw new this.HttpError(400, 'The brand needs an image')

            next()
        } catch (error) {
            next(error)
        }
    }

    checkBodyEditBrand = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            const brand = (await db.brand.findUnique({
                where: {
                    name: req.params.name,
                },
            })) as Brand

            if (brand.name !== req.body.name) {
                const otherBrand = await db.brand.findUnique({
                    where: {
                        name: req.body.name,
                    },
                })

                if (otherBrand)
                    throw new this.HttpError(400, 'The brand already exists')
            }

            if (req.file) {
                req.params.oldFile = brand.logo
            }

            next()
        } catch (error) {
            next(error)
        }
    }

    checkUpdateBrandAvailability = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            const brand = await db.brand.findUnique({
                where: {
                    name: req.params.name,
                },
            })

            if (!brand) throw new this.HttpError(404, 'Brand not found')

            if (typeof req.body.disabled !== 'boolean')
                throw new this.HttpError(
                    400,
                    'The disabled property is required and must be a boolean'
                )

            next()
        } catch (error) {
            next(error)
        }
    }

    checkIfBrandExists = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            const brand = await db.brand.findUnique({
                where: {
                    name: req.params.name,
                },
                include: {
                    _count: true,
                },
            })

            if (!brand) throw new this.HttpError(404, 'Brand not found')

            if (req.method !== 'PUT') {
                req.body = brand
            }

            next()
        } catch (error) {
            next(error)
        }
    }
}

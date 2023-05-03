import type { NextFunction, Request, Response } from 'express'

import { db } from '../database'
import { generateFileName } from '../helpers/generateFileName'
import { BaseMiddlewares } from '../config/bases'
import { deleteFile, writeNewFile } from '../helpers/fsFunctions'
import { CORE } from '../helpers/constants'

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

        writeNewFile(req.file, {
            nameFolder: CORE,
            fileName,
        })

        req.body.logo = `/uploads/core/${fileName}`

        next()
    }

    checkBodyEditBrand = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const brand = await db.brand.findUnique({
            where: {
                name: req.params.name,
            },
        })

        if (!brand) {
            next(new this.HttpError(404, 'Brand not found'))

            return
        }

        if (brand.name !== req.body.name) {
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

            req.body.logo = `/uploads/core/${fileName}`

            deleteFile({
                nameFolder: CORE,
                fileName: brand.logo.split('/').pop() as string,
            })

            writeNewFile(req.file, {
                nameFolder: CORE,
                fileName,
            })
        }

        next()
    }

    checkUpdateBrandAvailability = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const brand = await db.brand.findUnique({
            where: {
                name: req.params.name,
            },
        })

        if (!brand) {
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

    checkIfBrandExists = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const brand = await db.brand.findUnique({
            where: {
                name: req.params.name,
            },
            include: {
                _count: true,
            },
        })

        if (!brand) {
            next(new this.HttpError(404, 'Brand not found'))

            return
        }

        req.body = brand

        next()
    }
}

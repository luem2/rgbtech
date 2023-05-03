import type { Request, Response, NextFunction } from 'express'
import type { AwardSchema } from '../types'

import { db } from '../database'
import { deleteFile, writeNewFile } from '../helpers/fsFunctions'
import { generateFileName } from '../helpers/generateFileName'
import { CORE } from '../helpers/constants'
import { BaseMiddlewares } from '../config/bases'

export class AwardMiddlewares extends BaseMiddlewares {
    checkBodyAddAward = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const newAward = req.body as AwardSchema

        if (newAward.id) {
            next(
                new this.HttpError(401, 'This operation does not require an ID')
            )

            return
        }

        const awardFinded = await db.award.findUnique({
            where: {
                name: newAward.name,
            },
        })

        if (awardFinded) {
            next(new this.HttpError(401, 'The award already exists'))

            return
        }

        if (!req.file) {
            next(new this.HttpError(401, 'The image is required'))

            return
        }

        const fileName = generateFileName(req.file)

        writeNewFile(req.file, {
            fileName,
            nameFolder: CORE,
        })

        req.body.picture = `/uploads/core/${fileName}`

        next()
    }

    checkBodyEditAward = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const award = req.body as AwardSchema

        if (!award.id) {
            next(new this.HttpError(401, 'This operation requires an award id'))

            return
        }

        const awardFinded = await db.award.findUnique({
            where: {
                id: award.id,
            },
        })

        if (!awardFinded) {
            next(new this.HttpError(404, 'The award doesnt exists'))

            return
        }

        if (awardFinded.name !== award.name) {
            const otherAward = await db.award.findUnique({
                where: {
                    name: award.name,
                },
            })

            if (otherAward) {
                next(
                    new this.HttpError(
                        401,
                        'The award already exists, please try another name'
                    )
                )

                return
            }
        }

        if (req.file) {
            const fileName = generateFileName(req.file)

            deleteFile({
                fileName: awardFinded.picture.split('/').pop() as string,
                nameFolder: CORE,
            })

            writeNewFile(req.file, {
                fileName,
                nameFolder: CORE,
            })

            req.body.picture = `/uploads/core/${fileName}`
        }

        next()
    }

    checkIfAwardExists = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const award = await db.award.findUnique({
            where: {
                id: req.params.id,
            },
            include: {
                _count: true,
            },
        })

        if (!award) {
            next(new this.HttpError(404, 'The award doesnt exists'))

            return
        }

        req.body = award

        next()
    }
}

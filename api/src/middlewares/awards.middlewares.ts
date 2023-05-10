import type { Request, Response, NextFunction } from 'express'
import type { Award } from '@prisma/client'

import { db } from '../database'
import { BaseMiddlewares } from '../config/bases'

export class AwardMiddlewares extends BaseMiddlewares {
    checkBodyAddAward = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            const award = await db.award.findUnique({
                where: {
                    name: req.body.name,
                },
            })

            if (award) throw new this.HttpError(401, 'The award already exists')

            if (!req.file)
                throw new this.HttpError(401, 'The image is required')

            next()
        } catch (error) {
            next(error)
        }
    }

    checkBodyEditAward = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            const award = (await db.award.findUnique({
                where: {
                    id: req.params.id,
                },
            })) as Award

            if (award.name !== req.body.name) {
                const otherAward = await db.award.findUnique({
                    where: {
                        name: req.body.name,
                    },
                })

                if (otherAward)
                    throw new this.HttpError(
                        401,
                        'The award already exists, please try another name'
                    )
            }

            if (req.file) {
                req.params.oldFile = award.picture
            }

            next()
        } catch (error) {
            next(error)
        }
    }

    checkIfAwardExists = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            const award = await db.award.findUnique({
                where: {
                    id: req.params.id,
                },
                include: {
                    _count: true,
                },
            })

            if (!award) throw new this.HttpError(404, 'The award doesnt exists')

            if (req.method !== 'PUT') {
                req.body = award
            }

            next()
        } catch (error) {
            next(error)
        }
    }
}

import type { NextFunction, Request, Response } from 'express'

import { db } from '../database'
import { BaseMiddlewares } from '../config/bases'

export class TagMiddlewares extends BaseMiddlewares {
    checkBodyAddTag = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const tagFinded = await db.tag.findUnique({
            where: {
                name: req.body.name,
            },
        })

        if (tagFinded) {
            next(new this.HttpError(401, 'The tag already exists'))

            return
        }

        next()
    }

    checkBodyEditTag = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const tagFinded = await db.tag.findUnique({
            where: {
                name: req.params.name,
            },
        })

        if (!tagFinded) {
            next(new this.HttpError(404, 'The tag does not exist'))

            return
        }

        if (tagFinded.name !== req.body.name) {
            const otherTag = await db.tag.findUnique({
                where: {
                    name: req.body.name,
                },
            })

            if (otherTag) {
                next(new this.HttpError(401, 'The tag already exists'))

                return
            }
        }

        next()
    }

    normalizeTag = (req: Request, _res: Response, next: NextFunction) => {
        if (req.params.name && req.body.name) {
            const tagParams = req.params.name
            const tagBody = req.body.name as string

            if (tagParams.length < 2 || tagBody.length < 2) {
                next(
                    new this.HttpError(
                        401,
                        'The tag must have at least 2 letters'
                    )
                )

                return
            }

            const normalizedTagParams =
                tagParams[0].toUpperCase() + tagParams.slice(1).toLowerCase()

            const normalizedTagBody =
                tagBody[0].toUpperCase() + tagBody.slice(1).toLowerCase()

            req.params.name = normalizedTagParams
            req.body.name = normalizedTagBody
        } else {
            const tag = req.params.name ?? req.body.name

            if (tag.length < 2) {
                next(
                    new this.HttpError(
                        401,
                        'The tag must have at least 2 letters'
                    )
                )

                return
            }

            const normalizedTag =
                tag[0].toUpperCase() + tag.slice(1).toLowerCase()

            if (req.params.name) {
                req.params.name = normalizedTag
            } else {
                req.body.name = normalizedTag
            }
        }

        next()
    }

    checkNameTag = (req: Request, _res: Response, next: NextFunction) => {
        if (!req.body.name) {
            next(new this.HttpError(401, 'A name for the tag is required'))

            return
        }

        if (typeof req.body.name !== 'string') {
            next(new this.HttpError(401, 'The name must be a string'))

            return
        }

        next()
    }

    checkUpdateTagAvailability = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const tagFinded = await db.tag.findUnique({
            where: {
                name: req.params.name,
            },
        })

        if (!tagFinded) {
            next(new this.HttpError(404, `The tag doesn't exists`))

            return
        }

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
}

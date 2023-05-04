import type { NextFunction, Request, Response } from 'express'

import { db } from '../database'
import { BaseMiddlewares } from '../config/bases'
import { normalizeTag } from '../helpers'

export class TagMiddlewares extends BaseMiddlewares {
    checkBodyTag = async (req: Request, _res: Response, next: NextFunction) => {
        if (!req.body.name) {
            next(new this.HttpError(401, 'A name for the tag is required'))

            return
        }

        if (typeof req.body.name !== 'string') {
            next(new this.HttpError(401, 'The name must be a string'))

            return
        }

        if (req.body.name.length < 2) {
            next(
                new this.HttpError(
                    401,
                    'The name for the tag must be at least 2 characters'
                )
            )

            return
        }

        req.body.name = normalizeTag(req.body.name)

        next()
    }

    checkTypeOfDisabledProp = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
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

    checkIfTagExists = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const tag = await db.tag.findUnique({
            where: {
                name: req.params.name,
            },
            include: {
                _count: true,
            },
        })

        if (!tag) {
            next(new this.HttpError(404, `The tag doesn't exists`))

            return
        }

        if (req.method === 'GET') {
            req.body = tag
        }

        next()
    }

    checkIfTagAlreadyExists = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const tag = await db.tag.findUnique({
            where: {
                name: req.body.name,
            },
        })

        if (tag) {
            next(new this.HttpError(401, 'The tag already exists'))

            return
        }

        next()
    }
}

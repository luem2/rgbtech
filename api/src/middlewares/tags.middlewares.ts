import type { NextFunction, Request, Response } from 'express'

import { db } from '../database'
import { BaseMiddlewares } from '../config/bases'
import { normalizeTag } from '../helpers/normalizeTag'

export class TagMiddlewares extends BaseMiddlewares {
    checkBodyTag = async (req: Request, _res: Response, next: NextFunction) => {
        try {
            if (!req.body.name)
                throw new this.HttpError(401, 'A name for the tag is required')

            if (typeof req.body.name !== 'string')
                throw new this.HttpError(401, 'The name must be a string')

            if (req.body.name.length < 2)
                throw new this.HttpError(
                    401,
                    'The name for the tag must be at least 2 characters'
                )

            req.body.name = normalizeTag(req.body.name)

            next()
        } catch (error) {
            next(error)
        }
    }

    checkTypeOfDisabledProp = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            if (typeof req.body.disabled !== 'boolean')
                throw new this.HttpError(
                    401,
                    'The disabled property must be a boolean'
                )

            next()
        } catch (error) {
            next(error)
        }
    }

    checkIfTagExists = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            const tag = await db.tag.findUnique({
                where: {
                    name: req.params.name,
                },
                include: {
                    _count: true,
                },
            })

            if (!tag) throw new this.HttpError(404, `The tag doesn't exists`)

            if (req.method === 'GET') {
                req.body = tag
            }

            next()
        } catch (error) {
            next(error)
        }
    }

    checkIfTagAlreadyExists = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            if (!req.body.name) {
                throw new this.HttpError(401, 'A name for the tag is required')
            }

            const tag = await db.tag.findUnique({
                where: {
                    name: req.body.name,
                },
            })

            if (tag) throw new this.HttpError(401, 'The tag already exists')

            next()
        } catch (error) {
            next(error)
        }
    }
}

import type { NextFunction, Request, Response } from 'express'

import { db } from '../database'

class TagsMiddlewares {
    async checkBodyAddTag(req: Request, res: Response, next: NextFunction) {
        const tagFinded = await db.tag.findUnique({
            where: {
                name: req.body.name,
            },
        })

        if (tagFinded)
            return res.status(401).send({
                status: 'Error',
                msg: 'The tag already exists',
            })

        next()
    }

    async checkBodyEditTag(req: Request, res: Response, next: NextFunction) {
        const tagFinded = await db.tag.findUnique({
            where: {
                name: req.params.name,
            },
        })

        if (!tagFinded)
            return res.status(404).send({
                status: 'Error',
                msg: 'Tag not found',
            })

        if (tagFinded.name === req.body.name) {
            next()
        } else {
            const otherTag = await db.tag.findUnique({
                where: {
                    name: req.body.name,
                },
            })

            if (otherTag)
                return res.status(401).send({
                    status: 'Error',
                    msg: 'The tag already exists',
                })

            next()
        }
    }

    normalizeTag(req: Request, res: Response, next: NextFunction) {
        if (req.params.name && req.body.name) {
            const tagParams = req.params.name
            const tagBody = req.body.name as string

            if (tagParams.length < 2 || tagBody.length < 2) {
                return res.status(401).send({
                    status: 'Error',
                    msg: 'The tag must have at least 2 letters',
                })
            }

            const normalizedTagParams =
                tagParams[0].toUpperCase() + tagParams.slice(1).toLowerCase()

            const normalizedTagBody =
                tagBody[0].toUpperCase() + tagBody.slice(1).toLowerCase()

            req.params.name = normalizedTagParams
            req.body.name = normalizedTagBody
        } else {
            const tag = req.params.name ?? req.body.name

            if (tag.length < 2)
                return res.status(401).send({
                    status: 'Error',
                    msg: 'The tag must have at least 2 letters',
                })

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

    checkNameTag(req: Request, res: Response, next: NextFunction) {
        if (!req.body.name)
            res.status(401).send({
                status: 'Error',
                msg: 'A name for the tag is required',
            })

        if (typeof req.body.name !== 'string')
            return res.status(401).send({
                status: 'Error',
                msg: 'The name must be a string',
            })

        next()
    }

    async checkUpdateTagAvailability(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const tagFinded = await db.tag.findUnique({
            where: {
                name: req.params.name,
            },
        })

        if (!tagFinded)
            return res.status(404).send({
                status: 'Error',
                msg: `The tag doesn't exists`,
            })

        if (typeof req.body.disabled !== 'boolean')
            return res.status(401).send({
                status: 'Error',
                msg: 'The disabled property is required and must be a boolean',
            })

        next()
    }
}

export default new TagsMiddlewares()

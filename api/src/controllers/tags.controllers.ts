import type { Request, Response } from 'express'

import tagsServices from '../services/tags.services'

class TagsControllers {
    async getAllTags(_req: Request, res: Response) {
        const tags = await tagsServices.getAllTags()

        res.status(200).send({
            status: 'Success',
            msg: 'All tags have been successfully sent',
            body: {
                tags,
                count: tags.length,
            },
        })
    }

    async getTag(req: Request, res: Response) {
        const tag = await tagsServices.getTag(req.params)

        if (tag) {
            res.status(200).send({
                status: 'Success',
                msg: 'The tag has been successfully sent',
                body: tag,
            })
        } else {
            res.status(404).send({
                status: 'Error',
                msg: 'The tag has not been found',
                body: tag,
            })
        }
    }

    async tagUpdate(req: Request, res: Response) {
        const updatedTag = await tagsServices.tagUpdate(req)

        res.status(200).send({
            status: 'Success',
            msg: 'Tag have been successfully updated',
            body: updatedTag,
        })
    }

    async addTag(req: Request, res: Response) {
        const newTag = await tagsServices.addTag(req.body.name)

        res.status(201).send({
            status: 'Success',
            msg: 'Tag have been successfully created',
            body: newTag,
        })
    }

    async changeTagAvailability(req: Request, res: Response) {
        const tagUpdated = await tagsServices.changeTagAvailability(req)

        res.status(200).send({
            status: 'Success',
            msg: 'Tag have been successfully updated',
            body: tagUpdated,
        })
    }

    async deleteTag(req: Request, res: Response) {
        const tagDeleted = await tagsServices.deleteTag(req)

        if (!tagDeleted) {
            return res.status(404).send({
                status: 'Error',
                msg: 'The tag has not been found',
                body: tagDeleted,
            })
        }

        res.status(200).send({
            status: 'Success',
            msg: 'Tag have been successfully deleted',
            body: tagDeleted,
        })
    }
}

export default new TagsControllers()

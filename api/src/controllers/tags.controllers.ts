import type { Request, Response } from 'express'

import { TagServices } from '../services/tags.services'
import { BaseControllers } from '../config/bases'

export class TagControllers extends BaseControllers<TagServices> {
    constructor() {
        super(TagServices)
    }

    getAllTags = async (_req: Request, res: Response) => {
        const tags = await this.services.getAllTags()

        this.httpResponse.Ok(res, {
            msg: 'All tags have been successfully sent',
            tags_count: tags.length,
            tags,
        })
    }

    getTag = async ({ body }: Request, res: Response) => {
        this.httpResponse.Ok(res, {
            msg: 'The tag has been successfully sent',
            tag: body,
        })
    }

    tagUpdate = async (req: Request, res: Response) => {
        const updatedTag = await this.services.tagUpdate(req)

        this.httpResponse.Ok(res, {
            msg: 'The tag has been successfully updated',
            tag: updatedTag,
        })
    }

    addTag = async (req: Request, res: Response) => {
        const newTag = await this.services.addTag(req.body.name)

        this.httpResponse.Created(res, {
            msg: 'The tag has been successfully created',
            tag: newTag,
        })
    }

    changeTagAvailability = async (req: Request, res: Response) => {
        const tagUpdated = await this.services.changeTagAvailability(req)

        this.httpResponse.Ok(res, {
            msg: 'The tag has been successfully updated',
            tag: tagUpdated,
        })
    }

    deleteTag = async (req: Request, res: Response) => {
        const tagDeleted = await this.services.deleteTag(req)

        this.httpResponse.Ok(res, {
            msg: 'The tag has been successfully deleted',
            tag: tagDeleted,
        })
    }
}

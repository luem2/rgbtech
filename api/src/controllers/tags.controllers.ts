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

    getTag = async (req: Request, res: Response) => {
        const tag = await this.services.getTag(req.params)

        if (tag) {
            this.httpResponse.Ok(res, {
                msg: 'The tag has been successfully sent',
                tag,
            })
        } else {
            this.httpResponse.NotFound(res, 'The tag has not been found')
        }
    }

    tagUpdate = async (req: Request, res: Response) => {
        const updatedTag = await this.services.tagUpdate(req)

        this.httpResponse.Ok(res, {
            msg: 'The tag has been successfully updated',
            brand: updatedTag,
        })
    }

    addTag = async (req: Request, res: Response) => {
        const newTag = await this.services.addTag(req.body.name)

        this.httpResponse.Created(res, {
            msg: 'The tag has been successfully created',
            brand: newTag,
        })
    }

    changeTagAvailability = async (req: Request, res: Response) => {
        const tagUpdated = await this.services.changeTagAvailability(req)

        this.httpResponse.Ok(res, {
            msg: 'The tag has been successfully updated',
            brand: tagUpdated,
        })
    }

    deleteTag = async (req: Request, res: Response) => {
        const tagDeleted = await this.services.deleteTag(req)

        if (!tagDeleted) {
            this.httpResponse.NotFound(res, 'The tag has not been found')

            return
        }

        this.httpResponse.Ok(res, {
            msg: 'The tag has been successfully deleted',
            brand: tagDeleted,
        })
    }
}

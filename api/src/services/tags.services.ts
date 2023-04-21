import type { Request } from 'express'

import { db } from '../database'

class TagsServices {
    async getAllTags() {
        return await db.tag.findMany({
            include: {
                _count: true,
            },
        })
    }

    async getTag({ name }: Request['params']) {
        return await db.tag.findUnique({
            where: {
                name,
            },
            include: {
                _count: true,
            },
        })
    }

    async tagUpdate({ params, body }: Request) {
        return await db.tag.update({
            where: {
                name: params.name,
            },
            data: {
                name: body.name,
            },
        })
    }

    async addTag(newTag: string) {
        return await db.tag.create({
            data: {
                name: newTag,
            },
        })
    }

    async changeTagAvailability({ params, body }: Request) {
        return await db.tag.update({
            where: {
                name: params.name,
            },
            data: {
                disabled: body.disabled,
            },
        })
    }

    async deleteTag({ params }: Request) {
        const brand = await db.tag.findUnique({
            where: {
                name: params.name,
            },
        })

        if (!brand) return null

        return await db.tag.delete({
            where: {
                name: params.name,
            },
        })
    }
}

export default new TagsServices()

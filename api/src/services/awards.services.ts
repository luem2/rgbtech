import type { Request } from 'express'
import type { AwardSchema } from '../types'

import { db } from '../database'
import { deleteFile, writeNewFile } from '../helpers/fsFunctions'
import { AWARDS_PATH } from '../helpers/constants'

export class AwardServices {
    async getAllAwards() {
        return await db.award.findMany({
            include: {
                _count: true,
            },
        })
    }

    async awardUpdate({ body, file, params }: Request) {
        if (file) {
            deleteFile(params.oldFile)
            body.picture = writeNewFile(file, AWARDS_PATH)
        }

        return await db.award.update({
            where: {
                id: params.id,
            },
            data: body,
        })
    }

    async addAward({ file, body }: Request) {
        const newAward = body as AwardSchema

        return await db.award.create({
            data: {
                ...newAward,
                picture: writeNewFile(file, AWARDS_PATH),
            },
        })
    }

    async deleteAward(award: AwardSchema) {
        deleteFile(award.picture)

        return await db.award.delete({
            where: {
                id: award.id,
            },
        })
    }
}

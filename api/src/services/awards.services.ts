import type { AwardSchema } from '../types'
import type { Award } from '@prisma/client'

import { db } from '../database'
import { deleteFile } from '../helpers/fsFunctions'
import { CORE } from '../helpers/constants'

export class AwardServices {
    async getAllAwards() {
        return await db.award.findMany({
            include: {
                _count: true,
            },
        })
    }

    async awardUpdate(award: AwardSchema) {
        const { id, ...body } = award

        return await db.award.update({
            where: {
                id,
            },
            data: {
                ...body,
            },
        })
    }

    async addAward(newAward: AwardSchema) {
        return await db.award.create({
            data: newAward,
        })
    }

    async deleteAward(award: Award) {
        deleteFile({
            nameFolder: CORE,
            fileName: award.picture.split('/').pop() as string,
        })

        return await db.award.delete({
            where: {
                id: award.id,
            },
        })
    }
}

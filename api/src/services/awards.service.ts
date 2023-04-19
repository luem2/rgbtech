import type { Request } from 'express'
import type { AwardSchema } from '../types'

import { db } from '../database'
import { deleteFile } from '../helpers/fsFunctions'
import { CORE } from '../helpers/constants'

class AwardsServices {
    async getAllAwards(userRole: Request['userRole']) {
        if (userRole !== 'ADMIN') {
            return await db.award.findMany({})
        } else
            return await db.award.findMany({
                include: {
                    _count: true,
                },
            })
    }

    async getAward({ userRole, params }: Request) {
        if (userRole !== 'ADMIN') {
            return await db.award.findUnique({
                where: {
                    id: params.awardId,
                },
            })
        } else {
            return await db.award.findUnique({
                where: {
                    id: params.awardId,
                },
                include: {
                    _count: true,
                },
            })
        }
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

    async deleteAward({ id }: Request['params']) {
        const award = await db.award.findUnique({
            where: {
                id,
            },
        })

        if (!award) return null

        deleteFile({
            nameFolder: CORE,
            fileName: award.picture.split('/').at(-1) as string,
        })

        return await db.award.delete({
            where: {
                id,
            },
        })
    }
}

export default new AwardsServices()

// .put('/claim-award', async (req, res) => {
//     const { id, points, userId } = req.body
//     try {
//         const user = await User.findByPk(userId)
//         const RGBpoints = user.dataValues.RGBpoint - points
//         await User.update(
//             {
//                 RGBpoint: RGBpoints,
//             },
//             {
//                 where: {
//                     id: userId,
//                 },
//             }
//         )
//         const award = await Award.findByPk(id)
//         const newStock = award.dataValues.stock - 1
//         await Award.update(
//             {
//                 stock: newStock,
//             },
//             {
//                 where: {
//                     id: id,
//                 },
//             }
//         )
//         res.send(201)
//     } catch (error) {
//         console.log(error)
//         res.sendStatus(500)
//     }
// })

import type { Request, Response, NextFunction } from 'express'
import type { JwtPayload } from 'jsonwebtoken'
import type { AwardSchema } from '../types'

import { db } from '../database'
import { verifyToken } from '../helpers/generateToken'
import { deleteFile, writeNewFile } from '../helpers/fsFunctions'
import { generateFileName } from '../helpers/filename'
import { CORE } from '../helpers/constants'

class AwardsMiddlewares {
    async getAwardsAuthMiddleware(
        req: Request,
        _res: Response,
        next: NextFunction
    ) {
        const token = req.headers.authorization?.split(' ').pop()

        if (token) {
            const tokenData = await verifyToken(token)

            if (tokenData) {
                req.userRole = (tokenData as JwtPayload).role
            }
        }

        next()
    }

    async checkBodyAddAward(req: Request, res: Response, next: NextFunction) {
        const newAward = req.body as AwardSchema

        if (newAward.id)
            return res.status(401).send({
                status: 'Error',
                msg: 'This operation does not require an ID',
            })

        const awardFinded = await db.award.findUnique({
            where: {
                name: newAward.name,
            },
        })

        if (awardFinded)
            return res.status(401).send({
                status: 'Error',
                msg: 'The award already exists',
            })

        if (!req.file)
            return res.status(401).send({
                status: 'Error',
                msg: 'The image is required',
            })

        const fileName = generateFileName(req.file)

        writeNewFile(req.file, {
            fileName,
            nameFolder: CORE,
        })

        req.body.picture = `/uploads/core/${fileName}`

        next()
    }

    async checkBodyEditAward(req: Request, res: Response, next: NextFunction) {
        const award = req.body as AwardSchema

        if (!award.id)
            return res.status(401).send({
                status: 'Error',
                msg: 'Award id is needed to perform the operation',
            })

        const awardFinded = await db.award.findUnique({
            where: {
                id: award.id,
            },
        })

        if (!awardFinded)
            return res.status(404).send({
                status: 'Error',
                msg: 'Award id not found, the award doesnt exists',
            })

        if (awardFinded.name !== award.name) {
            const otherAward = await db.award.findUnique({
                where: {
                    name: award.name,
                },
            })

            if (otherAward)
                return res.status(401).send({
                    status: 'Error',
                    msg: 'The award already exists',
                })
        }

        if (req.file) {
            const fileName = generateFileName(req.file)

            deleteFile({
                fileName: awardFinded.picture.split('/').pop() as string,
                nameFolder: CORE,
            })

            writeNewFile(req.file, {
                fileName,
                nameFolder: CORE,
            })

            req.body.picture = `/uploads/core/${fileName}`
        }

        next()
    }
}

export default new AwardsMiddlewares()

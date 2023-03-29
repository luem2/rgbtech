import type { User } from '@prisma/client'
import type { NextFunction, Request, Response } from 'express'
import type multer from 'multer'

import { compare } from 'bcrypt'

import { db } from '../database'

class UsersMiddlewares {
    async checkUserEmailUpdateProfile(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const user = await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                email: true,
            },
        })

        if ((user as User).email === req.body.email) {
            next()
        }

        const otherUser = await db.user.findUnique({
            where: {
                email: req.body.email,
            },
        })

        if (otherUser) {
            res.status(401).send({
                status: 'Error',
                msg: 'A user has already registered with the email address entered',
            })
        } else {
            next()
        }
    }

    async checkUserOldPassword(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
        const user = (await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                password: true,
            },
        })) as User

        const passwordMatches = await compare(
            req.body.oldPassword,
            user?.password
        )

        if (!passwordMatches) {
            return res.status(401).send({
                status: 'Error',
                msg: 'The sent password does not match the current password',
            })
        }

        next()
    }

    filePhotoProfileFilter(
        _req: Request,
        file: Express.Multer.File,
        cb: multer.FileFilterCallback
    ): void {
        const mimeTypesAccepted = ['image/png', 'image/jpeg', 'image/jpg']

        if (mimeTypesAccepted.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('Only PNG, JPEG and JPG files are allowed'))
        }
    }
}

export default new UsersMiddlewares()

//     checkUserRegistrationGoogle: async (req, res, next) => {
//         const { mail } = req.body
//         try {
//             const findedUser = await User.findOne({
//                 where: {
//                     email: mail,
//                 },
//             })

//             if (findedUser === null) return res.sendStatus(404)
//             console.log(findedUser, 'encontré el usuario')

//             req.body.logged = true

//             if (!findedUser?.userVerificate) {
//                 return res.sendStatus(401)
//             }
//             req.body.findedUser = findedUser
//             return Object.keys(findedUser).length ? next() : res.sendStatus(404)
//         } catch {
//             return res.sendStatus(500)
//         }
//     },

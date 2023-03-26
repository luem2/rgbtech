import type { User } from '@prisma/client'
import type { NextFunction, Request, Response } from 'express'

import { db } from '../database'

// import jwt from 'jsonwebtoken'
// import nodemailer from 'nodemailer'
// import bcrypt from 'bcrypt'

// import { htmlMail, htmlMailSuccessfulPayment } from '../Utils/EmailTemplate.js'

class UsersMiddlewares {
    async checkUserProfile(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        // const user = (await db.user.findUnique({
        //     where: {
        //         id: req.userId,
        //     },
        // })) as User

        // const pepe = req.body.user ? '' : 'a'

        next()
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

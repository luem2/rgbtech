import type { Request } from 'express'
import type { User } from '@prisma/client'

import bcrypt from 'bcrypt'

import { db } from '../database'
import { tokenSign } from '../helpers/generateToken'
import nodemailerService from '../helpers/nodemailer'

class AuthServices {
    async login(req: Request): Promise<string | null> {
        const userFinded = await db.user.findUnique({
            where: {
                email: req.body.email,
            },
        })

        if (!userFinded) return null

        const verificatedPassword = await bcrypt.compare(
            req.body.password,
            userFinded.password
        )

        if (!verificatedPassword) return null

        return await tokenSign({ id: userFinded.id, role: userFinded.role })
    }

    async getProfile(req: Request): Promise<User | null> {
        return await db.user.findUnique({
            where: {
                id: req.userId,
            },
        })
    }

    async register(user: User): Promise<User> {
        const newUser = await db.user.create({
            data: {
                ...user,
                password: await bcrypt.hash(user.password, 10),
            },
        })

        nodemailerService.sendAccountConfirmationEmail(user)

        return newUser
    }

    async passwordUpdate(req: Request): Promise<User> {
        const id = !req.params.id ? req.userId : req.params.id

        return await db.user.update({
            where: {
                id,
            },
            data: {
                password: await bcrypt.hash(req.body.newPassword, 10),
            },
        })
    }

    async passwordRecoveryEmail(req: Request): Promise<void> {
        const user = await db.user.findUnique({
            where: {
                email: req.body.email,
            },
        })

        if (!user) return

        nodemailerService.sendPasswordRecoveryEmail(user)
    }

    async accountConfirmation(req: Request): Promise<User> {
        return await db.user.update({
            where: {
                id: req.params.id,
            },
            data: {
                verificated: true,
            },
        })
    }
}

// router.post('/registerGoogle', async (req, res) => {
//     try {
//         let { user, mail, profilePhoto, password } = req.body
//         const findedUser = await User.findOne({
//             where: {
//                 mail: mail,
//             },
//         })
//         if (!findedUser) {
//             const hashedPassword = await bcrypt.hash(password, 10)
//             const newUser = await User.create({
//                 user,
//                 profilePhoto,
//                 mail,
//                 password: hashedPassword,
//                 userVerificate: true,
//                 LogGoogle: true,
//             })
//             const { id, cartShop, favorite } = newUser
//             const infoFront = { id: id, cartShop: cartShop, favorite: favorite }
//             const accessToken = jwt.sign(infoFront, process.env.SECRET)
//             console.log(accessToken)
//             return res.status(200).json({
//                 mssage: 'usuario autenticado',
//                 token: accessToken,
//             })
//         } else {
//             const { id, cartShop, favorite } = findedUser.dataValues
//             const infoFront = { id: id, cartShop: cartShop, favorite: favorite }
//             const accessToken = jwt.sign(infoFront, process.env.SECRET)
//             console.log(accessToken)
//             return res.status(200).json({
//                 mssage: 'usuario autenticado',
//                 token: accessToken,
//             })
//         }
//     } catch (error) {
//         return res.send(error)
//     }
// })

// // router.post("/loginGoogle", findOrCreate,async (req, res) => {
// // 		try {
// // 			const { mail } = req.body;
// // 			console.log(req.body,"ee")
// // 			const user = await User.findOne({
// // 				where: {
// // 					mail: mail,
// // 				},
// // 			});
// // 			if (user) {
// // 				const { id } = user.dataValues
// // 				const logedUser = {id
// // 					// id,
// // 					// user,
// // 					// mail,
// // 					// profilePhoto,

// // 					// isAdmin,
// // 				}
// // 				const accessToken = jwt.sign(logedUser, process.env.SECRET);
// // 				console.log(accessToken)
// // 				return res.status(200).json({
// // 					mssage: "usuario autenticado",
// // 					token: accessToken,
// // 				});
// // 			}
// // 		} catch (error) {
// // 			res.json({ message: error });
// // 		}
// // 	}
// // );

export default new AuthServices()

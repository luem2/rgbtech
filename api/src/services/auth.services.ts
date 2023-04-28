import type { Request } from 'express'
import type { User } from '@prisma/client'

import bcrypt from 'bcrypt'

import { db } from '../database'
import { tokenSign } from '../helpers/generateToken'
import nodemailerService from '../helpers/nodemailer'
import { deleteFile } from '../helpers/fsFunctions'
import { DEFAULT_AVATAR, PICTURES } from '../helpers/constants'

export class AuthServices {
    async login({ id, role }: User) {
        return await tokenSign({ id, role })
    }

    async getProfile(id: Request['userId']) {
        return await db.user.findUnique({
            where: {
                id,
            },
            select: {
                _count: true,
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                picture: true,
                RGBpoints: true,
                birthDate: true,
                role: true,
                verificated: true,
                nationality: true,
                google: true,
                disabled: true,

                awards: true,
                country: true,
                favorites: true,
                history: true,
                reviews: true,
                shoppingCart: true,
                transactions: true,

                createdAt: true,
                updatedAt: true,
            },
        })
    }

    async register(user: User) {
        const newUser = await db.user.create({
            data: {
                ...user,
                password: await bcrypt.hash(user.password, 10),
            },
        })

        nodemailerService.sendAccountConfirmationEmail(newUser)

        return newUser
    }

    async passwordUpdate({ userId, body }: Request) {
        await db.user.update({
            where: {
                id: userId,
            },
            data: {
                password: await bcrypt.hash(body.newPassword, 10),
            },
        })
    }

    async passwordRecoveryEmail(user: User) {
        nodemailerService.sendPasswordRecoveryEmail(user)

        return user.firstName
    }

    async accountConfirmation(id: Request['userId']) {
        return await db.user.update({
            where: {
                id,
            },
            data: {
                verificated: true,
            },
        })
    }

    async deleteUser(user: User) {
        const userPicture = user.picture.split('/').pop() as string

        if (userPicture !== DEFAULT_AVATAR) {
            deleteFile({
                nameFolder: PICTURES,
                fileName: userPicture,
            })
        }

        return await db.user.delete({
            where: {
                id: user.id,
            },
        })
    }
}

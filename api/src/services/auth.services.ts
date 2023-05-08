import type { Request } from 'express'
import type { User } from '@prisma/client'

import bcrypt from 'bcrypt'

import { db } from '../database'
import { signToken } from '../helpers/generateToken'
import nodemailerService from '../config/nodemailer'
import { deleteFile, writeNewFile } from '../helpers/fsFunctions'
import { DEFAULT_AVATAR_PATH, IMAGES_PATH } from '../helpers/constants'
import { BaseServices } from '../config/bases'

export class AuthServices extends BaseServices {
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

    async login({ id, role }: User) {
        return signToken({ id, role })
    }

    async register({ file, body }: Request) {
        const newUser = await db.user.create({
            data: {
                ...body,
                password: await bcrypt.hash(body.password, 10),
                picture: file
                    ? writeNewFile(file, IMAGES_PATH)
                    : DEFAULT_AVATAR_PATH,
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
        await db.user.update({
            where: {
                id,
            },
            data: {
                verificated: true,
            },
        })
    }

    async deleteUser(user: User) {
        deleteFile(user.picture)

        return await db.user.delete({
            where: {
                id: user.id,
            },
        })
    }
}

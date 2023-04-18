import type { Request } from 'express'
import type { User } from '@prisma/client'

import bcrypt from 'bcrypt'

import { db } from '../database'
import { tokenSign } from '../helpers/generateToken'
import nodemailerService from '../helpers/nodemailer'

class AuthServices {
    async login({ body, userId }: Request) {
        const user = body as User

        userId = user.id

        return await tokenSign({ id: user.id, role: user.role })
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

    async passwordUpdate({ userId, params, body }: Request) {
        const id = params.id ?? userId

        return await db.user.update({
            where: {
                id,
            },
            data: {
                password: await bcrypt.hash(body.newPassword, 10),
            },
        })
    }

    async passwordRecoveryEmail({ email }: Request['body']) {
        const user = await db.user.findUnique({
            where: {
                email,
            },
        })

        if (!user) return

        nodemailerService.sendPasswordRecoveryEmail(user)
    }

    async accountConfirmation({ id }: Request['params']) {
        return await db.user.update({
            where: {
                id,
            },
            data: {
                verificated: true,
            },
        })
    }
}

export default new AuthServices()

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

    async passwordRecovery(req: Request): Promise<User> {
        return await db.user.update({
            where: {
                id: req.params.id,
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

export default new AuthServices()

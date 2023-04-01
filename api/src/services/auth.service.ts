import type { Request } from 'express'
import type { User } from '@prisma/client'

import bcrypt from 'bcrypt'

import { db } from '../database'
import { tokenSign } from '../helpers/generateToken'
import nodemailerService from '../helpers/nodemailer'

class AuthServices {
    async login(user: User) {
        return await tokenSign({ id: user.id, role: user.role })
    }

    async getProfile(req: Request) {
        return await db.user.findUnique({
            where: {
                id: req.userId,
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

    async passwordUpdate(req: Request) {
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

    async passwordRecoveryEmail(req: Request) {
        const user = await db.user.findUnique({
            where: {
                email: req.body.email,
            },
        })

        if (!user) return

        nodemailerService.sendPasswordRecoveryEmail(user)
    }

    async accountConfirmation(req: Request) {
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

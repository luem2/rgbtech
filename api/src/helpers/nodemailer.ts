import type { UserWithCart } from '../types'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'
import type { User } from '@prisma/client'

import nodemailer from 'nodemailer'

import { tokenSign } from '../helpers/generateToken'
import {
    accountConfirmationHtmlEmail,
    purchaseDetailsHtmlEmail,
    passwordRecoveryHtmlEmail,
} from '../config/emailTemplate'
import { config } from '../config'

class NodemailerEmail {
    readonly transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.NODEMAILER_EMAIL,
                pass: config.NODEMAILER_PASSWORD,
            },
        })
    }

    async sendAccountConfirmationEmail(user: User): Promise<void> {
        const emailToken = await tokenSign({ id: user.id, role: user.role })

        const url = `${config.ORIGIN_CORS}/email-verification/${emailToken}`

        await this.transporter.sendMail({
            from: 'rgbtech.ecommerce@gmail.com',
            to: user.email,
            subject: 'Email Confirmation',
            html: accountConfirmationHtmlEmail(url),
        })
    }

    async sendPasswordRecoveryEmail(user: User): Promise<void> {
        const emailToken = await tokenSign({ id: user.id, role: user.role })

        const url = `${config.ORIGIN_CORS}/password-recovery/${emailToken}`

        await this.transporter.sendMail({
            from: 'rgbtech.ecommerce@gmail.com',
            to: user.email,
            subject: 'Password Recovery',
            html: passwordRecoveryHtmlEmail(url),
        })
    }

    async sendPurchaseInformationEmail(user: UserWithCart): Promise<void> {
        await this.transporter.sendMail({
            from: 'rgbtech.ecommerce@gmail.com',
            to: user.email,
            subject: 'Password Recovery',
            html: purchaseDetailsHtmlEmail(user),
        })
    }
}

export default new NodemailerEmail()

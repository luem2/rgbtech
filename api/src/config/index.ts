import dotenv from 'dotenv'

dotenv.config()

export const config = {
    PORT: process.env.PORT ?? 3000,
    SECRET: process.env.SECRET ?? 'SECRET',
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    CLIENT_URL: process.env.CLIENT_URL ?? 'http://localhost:8080',
    API_URL: process.env.API_URL ?? 'http://localhost:3000',
    PAYPAL_API_CLIENTID: process.env.PAYPAL_API_CLIENTID ?? 'CLIENTID',
    PAYPAL_API_SECRET: process.env.PAYPAL_API_SECRET ?? 'SECRET',
    PAYPAL_API_URL: process.env.PAYPAL_API_URL ?? 'URL',
    NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL ?? 'EMAIL',
    NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD ?? 'PASSWORD',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? 'CLIENT_ID',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? 'SECRET',
}

export abstract class ConfigServer {
    constructor() {
        const nodeNameEnv = this.createPathEnv(this.nodeEnv)

        dotenv.config({
            path: nodeNameEnv,
        })
    }

    public getEnvironment(k: string) {
        return process.env[k] ?? ''
    }

    public getNumberEnvironment(k: string) {
        return Number(this.getEnvironment(k))
    }

    public get nodeEnv() {
        return this.getEnvironment('NODE_ENV')?.trim() ?? ''
    }

    public createPathEnv(path: string) {
        const arrEnv: string[] = ['env']

        if (path.length > 0) {
            const stringToArray = path.split('.')

            arrEnv.unshift(...stringToArray)
        }

        return '.' + arrEnv.join('.')
    }
}

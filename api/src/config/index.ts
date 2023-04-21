import dotenv from 'dotenv'

dotenv.config()

export const config = {
    PORT: process.env.PORT ?? 3001,
    SECRET: process.env.SECRET ?? '',
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    ORIGIN_CORS:
        process.env.NODE_ENV === 'production'
            ? process.env.ORIGIN_CORS
            : 'http://localhost:8080',
    PAYPAL_API_CLIENTID: process.env.PAYPAL_API_CLIENTID ?? '',
    PAYPAL_API_SECRET: process.env.PAYPAL_API_SECRET ?? '',
    PAYPAL_API_URL: process.env.PAYPAL_API_URL ?? '',
    NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL ?? '',
    NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD ?? '',
}

export abstract class ConfigServer {
    constructor() {
        const nodeNameEnv = this.createPathEnv(this.nodeEnv)

        dotenv.config({
            path: nodeNameEnv,
        })
    }

    public getVarEnv(k: string) {
        return process.env[k] ?? ''
    }

    public getNumberVarEnv(k: string) {
        return Number(this.getVarEnv(k))
    }

    public get nodeEnv() {
        return this.getVarEnv('NODE_ENV')?.trim() ?? ''
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

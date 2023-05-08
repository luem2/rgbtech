export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string
            PORT: string
            SECRET: string
            PAYPAL_API_CLIENTID: string
            PAYPAL_API_SECRET: string
            PAYPAL_API_URL: string
            NODEMAILER_EMAIL: string
            NODEMAILER_PASSWORD: string
            API_URL: string
            CLIENT_URL: string
            NODE_ENV: 'development' | 'production'
            GOOGLE_CLIENT_ID: string
            GOOGLE_CLIENT_SECRET: string
        }
    }
}

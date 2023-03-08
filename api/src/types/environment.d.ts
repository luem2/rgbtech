export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string
            SECRET: string
            NODE_ENV: 'development' | 'production'
            ORIGIN_CORS: string
            CLOUDINARY_API_KEY: string
            CLOUDINARY_API_SECRET: string
            CLOUDINARY_CLOUD_NAME: string
            PAYPAL_API_CLIENTID: string
            PAYPAL_API_SECRET: string
            PAYPAL_API_URL: string
        }
    }
}

import dotenv from 'dotenv'

dotenv.config()

export const config = {
    PORT: process.env.PORT ?? 3001,
    SECRET: process.env.SECRET ?? '',
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    ORIGIN_CORS:
        process.env.NODE_ENV === 'production' ? process.env.ORIGIN_CORS : '*',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ?? '',
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ?? '',
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ?? '',
    PAYPAL_API_CLIENTID: process.env.PAYPAL_API_CLIENTID ?? '',
    PAYPAL_API_SECRET: process.env.PAYPAL_API_SECRET ?? '',
    PAYPAL_API_URL: process.env.PAYPAL_API_URL ?? '',
}

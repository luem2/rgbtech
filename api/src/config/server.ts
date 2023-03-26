import type { Application } from 'express'

import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import routes from '../routes'
import { handleError } from '../middlewares/handleError'

import { config } from './env'

class Server {
    readonly app: Application
    readonly port: string | number
    readonly apiPaths = {
        docs: '/docs',
        api: '/api',
    }

    constructor() {
        this.app = express()
        this.port = config.PORT

        this.middlewares()
        this.routes()
    }

    middlewares(): void {
        this.app.use(
            cors({
                origin: config.ORIGIN_CORS,
                credentials: true,
                methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
                allowedHeaders: [
                    'Origin',
                    'X-Requested-With',
                    'Content-Type',
                    'Accept',
                ],
            })
        )

        this.app.use(morgan('dev'))
        this.app.use(cookieParser())
        this.app.use(
            express.json({
                limit: '50mb',
            })
        )

        this.app.use(
            express.urlencoded({
                extended: true,
                limit: '50mb',
            })
        )
        this.app.use(express.static('public'))
        this.app.use('/uploads', express.static('uploads'))
        this.app.use(handleError)
    }

    routes(): void {
        this.app.use(this.apiPaths.api, routes)
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.info(`🟢 Server listening on port ${this.port}`)
        })
    }
}

export default Server

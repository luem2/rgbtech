import type { Application } from 'express'

import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'

import swaggerSetup from '../docs/swagger'
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
                origin:
                    config.NODE_ENV === 'production' &&
                    typeof config.ORIGIN_CORS !== 'undefined'
                        ? JSON.parse(config.ORIGIN_CORS)
                        : config.ORIGIN_CORS,
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
        this.app.use(handleError)
    }

    routes(): void {
        this.app.use(this.apiPaths.api, routes)

        this.app.use(
            this.apiPaths.docs,
            swaggerUi.serve,
            swaggerUi.setup(swaggerSetup)
        )
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.info(`🟢 Server listening on port ${this.port}`)
        })
    }
}

export default Server

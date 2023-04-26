import type { Application } from 'express'

import path from 'path'
import { readFileSync } from 'fs'

import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import routes from './routers'
import { ErrorHandler } from './middlewares/errorHandler'
import { ConfigServer } from './config'

class ServerBootstrap extends ConfigServer {
    readonly app: Application
    readonly port: number

    constructor() {
        super()

        this.app = express()
        this.port = this.getNumberEnvironment('PORT') ?? 3000

        this.middlewares()
        this.routes()
        this.listen()
    }

    middlewares() {
        this.app.use(
            cors({
                origin: this.getEnvironment('ORIGIN_CORS'),
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
    }

    routes() {
        this.app.use('/api', routes)
        this.app.use(new ErrorHandler().throw)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.info(readFileSync(path.resolve('./src/banner.md'), 'utf-8'))
            console.info(`🟢 Server listening on port ${this.port}`)
        })
    }
}

new ServerBootstrap()

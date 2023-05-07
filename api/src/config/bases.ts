import { Router } from 'express'

import { HttpResponse } from '../helpers/httpResponse'
import { AuthMiddlewares } from '../middlewares/auth.middlewares'
import { HttpError } from '../helpers/customError'

export class BaseRouter<T, U> {
    public router: Router
    public controllers: T
    public middlewares: U
    public auth: AuthMiddlewares

    constructor(TControllers: new () => T, UMiddlewares: new () => U) {
        this.router = Router()
        this.controllers = new TControllers()
        this.middlewares = new UMiddlewares()
        this.auth = new AuthMiddlewares()
    }
}

export class BaseMiddlewares {
    public HttpError

    constructor() {
        this.HttpError = HttpError
    }
}

export class BaseControllers<T> {
    public httpResponse: HttpResponse
    public services: T

    constructor(TServices: new () => T) {
        this.httpResponse = new HttpResponse()
        this.services = new TServices()
    }
}

export class BaseServices {
    public HttpError

    constructor() {
        this.HttpError = HttpError
    }
}

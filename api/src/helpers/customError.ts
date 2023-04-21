import type { HttpStatus } from './httpResponse'

export class HttpError extends Error {
    declare statusCode: HttpStatus

    constructor(statusCode: HttpStatus, message: string) {
        super(message)

        this.statusCode = statusCode

        Error.captureStackTrace(this, HttpError)
    }
}

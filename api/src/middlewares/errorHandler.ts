import type { Request, Response, NextFunction } from 'express'

import { ValidationError } from 'yup'

import { HttpError } from '../helpers/customError'
import { HttpResponse, HttpStatus } from '../helpers/httpResponse'

export class ErrorHandler extends HttpResponse {
    throw = (
        err: Error | ValidationError | HttpError,
        _req: Request,
        res: Response,
        _next: NextFunction
    ) => {
        if (err instanceof HttpError) {
            switch (err.statusCode) {
                case HttpStatus.BAD_REQUEST:
                    this.BadRequest(res, err.message)

                    return

                case HttpStatus.UNAUTHORIZED:
                    this.Unauthorized(res, err.message)

                    return

                case HttpStatus.NOT_FOUND:
                    this.NotFound(res, err.message)

                    return

                default:
                    this.InternalServerError(res, err.message)

                    return
            }
        }

        if (err instanceof ValidationError) {
            this.BadRequest(res, err.message)

            return
        }

        this.InternalServerError(res, err.message)
    }
}

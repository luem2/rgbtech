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
        switch (true) {
            case err instanceof HttpError:
                if (HttpStatus.BAD_REQUEST) {
                    this.BadRequest(res, err.message)

                    return
                }

                if (HttpStatus.UNAUTHORIZED) {
                    this.Unauthorized(res, err.message)

                    return
                }

                if (HttpStatus.NOT_FOUND) {
                    this.NotFound(res, err.message)

                    return
                }

                return

            case err instanceof ValidationError:
                this.BadRequest(res, err.message)

                return

            default:
                this.InternalServerError(res, err.message)
        }
    }
}

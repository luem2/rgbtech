import type { Request, Response, NextFunction } from 'express'

import { ValidationError } from 'yup'

export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    // if (err instanceof )

    if (err instanceof ValidationError) {
        res.status(400).send({
            status: 'Validation Error',
            msg: err,
        })
    } else {
        res.status(500).send({
            error: 'Internal server error',
            stack: err.stack,
            name: err.name,
            message: err.message,
            cause: err.cause ?? undefined,
        })
    }
}

import type { Request, Response, NextFunction } from 'express'

import { ValidationError } from 'yup'

export function handleError(
    err: Error,
    _req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof ValidationError) {
        res.status(400).send({
            status: 'Error',
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

    next()
}

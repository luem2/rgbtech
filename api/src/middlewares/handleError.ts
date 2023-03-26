import type { Request, Response, NextFunction } from 'express'

export function handleError(
    err: Error,
    _req: Request,
    res: Response,
    next: NextFunction
): void {
    res.status(500).send({
        status: 'Server Error',
        name: err.name,
        message: err.message,
        cause: err.cause ?? undefined,
    })

    next()
}

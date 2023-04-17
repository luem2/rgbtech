import type { NextFunction, Request, Response } from 'express'

export function parseBody(req: Request, _res: Response, next: NextFunction) {
    for (const key in req.body) {
        try {
            req.body[key] = JSON.parse(req.body[key])
        } catch (error) {
            continue
        }
    }

    next()
}

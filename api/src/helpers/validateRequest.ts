import type { Request, Response, NextFunction } from 'express'
import type { AnySchema } from 'yup'

export function validateSchema(schema: AnySchema) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            await schema.validate({
                body: req.body,
                params: req.params,
                query: req.query,
            })

            next()
        } catch (error) {
            return res.status(400).send({
                msg: error,
            })
        }
    }
}

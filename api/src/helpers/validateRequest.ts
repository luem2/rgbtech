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

export async function validateSchemaInsideMiddleware(
    schema: AnySchema,
    req: Request
) {
    interface SchemaValidProps {
        valid: boolean
        err?: unknown
    }

    const reqSchema: SchemaValidProps = {
        valid: true,
    }

    try {
        await schema.validate({
            body: req.body,
            params: req.params,
            query: req.query,
        })

        return reqSchema
    } catch (error) {
        reqSchema.valid = false
        reqSchema.err = error

        return reqSchema
    }
}

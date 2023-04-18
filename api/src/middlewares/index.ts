import type multer from 'multer'
import type { Request, Response, NextFunction } from 'express'
import type { AnySchema } from 'yup'

export function filePhotoProfileFilter(
    _req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) {
    const mimeTypesAccepted = ['image/png', 'image/jpeg', 'image/jpg']

    if (mimeTypesAccepted.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Only PNG, JPEG and JPG files are allowed'))
    }
}

export function validateSchema(schema: AnySchema) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            await schema.validate(
                {
                    body: req.body,
                    params: req.params,
                    query: req.query,
                },
                {
                    strict: true,
                }
            )

            next()
        } catch (error) {
            next(error)
        }
    }
}

export async function validateSchemaInsideMiddleware(
    schema: AnySchema,
    { body, params, query, parsedQuery }: Request
) {
    interface SchemaValidProps {
        valid: boolean
        err?: unknown
    }

    const reqSchema: SchemaValidProps = {
        valid: true,
    }

    try {
        await schema.validate(
            {
                body,
                params,
                query: parsedQuery ?? query,
            },
            {
                strict: true,
            }
        )

        return reqSchema
    } catch (error) {
        reqSchema.valid = false
        reqSchema.err = error

        return reqSchema
    }
}

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

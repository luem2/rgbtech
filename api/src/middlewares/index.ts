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
    return async function (
        { body, params, query }: Request,
        _res: Response,
        next: NextFunction
    ) {
        try {
            await schema.validate(
                {
                    body,
                    params,
                    query,
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

export function parseRequest(prop: 'body' | 'query') {
    return (req: Request, _res: Response, next: NextFunction) => {
        for (const key in req[prop]) {
            try {
                req[prop][key] = JSON.parse(req[prop][key])
            } catch (error) {
                continue
            }
        }

        next()
    }
}

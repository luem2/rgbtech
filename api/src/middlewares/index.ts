import type multer from 'multer'
import type { Request, Response, NextFunction } from 'express'
import type { AnySchema } from 'yup'

import { db } from '../database'
import { HttpError } from '../helpers/customError'

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

export async function validateBirthDateAndCountry(
    { body }: Request,
    _res: Response,
    next: NextFunction
) {
    try {
        const { birthDate, nationality } = body

        const countries = (
            await db.country.findMany({
                select: {
                    id: true,
                },
            })
        ).map((country) => country.id)

        const date = new Date(birthDate)

        if (date.getFullYear() < 1900)
            throw new HttpError(401, 'Birth date must be greater than 1900')

        if (!countries.includes(nationality))
            throw new HttpError(401, 'Invalid nationality')

        body.birthDate = date

        next()
    } catch (error) {
        next(error)
    }
}

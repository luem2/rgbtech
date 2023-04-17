import type multer from 'multer'
import type { Request } from 'express'

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

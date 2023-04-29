import type { RequestHandler } from 'express'

import multer from 'multer'

import { filePhotoProfileFilter } from '../middlewares'

declare interface Multer extends multer.Multer {
    (options?: multer.Options): RequestHandler
    single: (
        fieldname: 'avatar' | 'award' | 'brand' | 'product'
    ) => RequestHandler
}

export default multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter: filePhotoProfileFilter,
}) as Multer

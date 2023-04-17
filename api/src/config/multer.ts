import multer from 'multer'

import { filePhotoProfileFilter } from '../middlewares'
import { generateFileName } from '../helpers/filename'

function storageFile(destination: string) {
    return multer.diskStorage({
        destination,
        filename: (_req, file, cb) => {
            cb(null, generateFileName(file))
        },
    })
}

export const multerTemp = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter: filePhotoProfileFilter,
})

export const multerCore = multer({
    storage: storageFile('uploads/core'),
    fileFilter: filePhotoProfileFilter,
})

export const multerAvatar = multer({
    storage: storageFile('uploads/pictures'),
    fileFilter: filePhotoProfileFilter,
})

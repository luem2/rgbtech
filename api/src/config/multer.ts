import multer from 'multer'

import { filePhotoProfileFilter } from '../middlewares'

export default multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter: filePhotoProfileFilter,
})

import path from 'path'

import multer from 'multer'
import { v4 as uuid } from 'uuid'

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (_req, file, cb) => {
        const nameFile = `${file.fieldname}-${
            file.originalname.split('.')[0]
        }-${uuid()}`

        cb(null, nameFile + path.extname(file.originalname))
    },
})

export default multer({
    storage,
})

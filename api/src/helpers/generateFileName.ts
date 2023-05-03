import type { Request } from 'express'

export function generateFileName(file: Request['file']) {
    if (typeof file === 'undefined') {
        throw new Error('File not found')
    }

    return `${file.originalname.split('.')[0]}-${new Date().toISOString()}.${
        file.mimetype.split('/')[1]
    }`
}

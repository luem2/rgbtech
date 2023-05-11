import type { Request } from 'express'

import fs from 'fs'
import path from 'path'

import { DEFAULT_AVATAR_PATH } from './constants'

export function writeNewFile(file: Request['file'], pathFile: string) {
    const image = file as Express.Multer.File
    const green = '\x1b[32m%s\x1b[0m'

    const nameFile =
        image.originalname.split('.')[0] +
        '-' +
        new Date().toISOString() +
        '.' +
        image.mimetype.split('/')[1]

    const absolutePath = path.resolve() + pathFile + nameFile

    fs.writeFile(absolutePath, image.buffer, (err) => {
        if (err) {
            console.info('File could not be created')
        } else {
            console.info(green, 'File was successfully saved')
            console.info(green, nameFile)
        }
    })

    return pathFile + nameFile
}

export function deleteFile(pathFile: string) {
    const red = '\x1b[31m%s\x1b[0m'

    const absolutePath = path.resolve() + pathFile
    const nameFile = pathFile.split('/').at(-1)

    if (pathFile !== DEFAULT_AVATAR_PATH) {
        fs.unlink(absolutePath, (err) => {
            if (err) {
                console.info('File could not be deleted')
            } else {
                console.info(red, 'File was successfully removed:')
                console.info(red, nameFile)
            }
        })
    }
}

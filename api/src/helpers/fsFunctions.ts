import type { User } from '@prisma/client'
import type { Request } from 'express'

import fs from 'fs'
import path from 'path'

import { DEFAULT_AVATAR_PATH } from './constants'

export function writeNewFile(file: Request['file'], pathFile: string) {
    try {
        if (typeof file === 'undefined') throw new Error('File not found')

        const nameFile =
            file.originalname.split('.')[0] +
            '-' +
            new Date().toISOString() +
            '.' +
            file.mimetype.split('/')[1]

        const absolutePath = path.resolve() + pathFile + nameFile

        fs.writeFile(absolutePath, file.buffer, (err) => {
            if (err) {
                throw new Error(err.message)
            } else {
                console.info('File was successfully saved')
                console.info(`File: ${nameFile}`)
            }
        })

        return pathFile + nameFile
    } catch (error) {
        console.error(error)
    }
}

export function deleteFile(arg: string | User) {
    try {
        if (typeof arg === 'string') {
            const absolutePath = path.resolve() + arg

            fs.unlink(absolutePath, (err) => {
                if (err) {
                    throw new Error(err.message)
                } else {
                    console.info('File was successfully removed')
                    console.info(`File: ${arg.split('/')[1]}`)
                }
            })
        } else {
            if (arg.picture !== DEFAULT_AVATAR_PATH) {
                const absolutePath = path.resolve() + arg.picture

                fs.unlink(absolutePath, (err) => {
                    if (err) {
                        throw new Error(err.message)
                    } else {
                        console.info('File was successfully removed')
                        console.info(`File: ${arg.picture.split('/')[1]}`)
                    }
                })
            }
        }
    } catch (error) {
        console.error(error)
    }
}

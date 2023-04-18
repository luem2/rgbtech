import type { Request } from 'express'

import fs from 'fs'
import path from 'path'

interface ConfigProps {
    nameFolder: string
    fileName: string
}

export function writeNewFile(file: Request['file'], config: ConfigProps) {
    const { fileName, nameFolder } = config

    if (typeof file === 'undefined') throw new Error('File not found')

    const pathFile = `${path.resolve()}/uploads/${nameFolder}/${fileName}`

    fs.writeFile(pathFile, file.buffer, (err) => {
        if (err) {
            throw new Error(err.message)
        }

        console.info(`The file was successfully saved in: ${pathFile}`)
    })
}

export function deleteFile(config: ConfigProps) {
    const { fileName, nameFolder } = config

    const pathFile = `${path.resolve()}/uploads/${nameFolder}/${fileName}`

    fs.unlink(pathFile, (err) => {
        if (err) {
            console.info(err.message)
        }

        console.info(`The file ${fileName} was successfully removed`)
    })
}

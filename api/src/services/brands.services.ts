import type { Request } from 'express'
import type { BrandSchema } from '../types'

import { db } from '../database'
import { deleteFile, writeNewFile } from '../helpers/fsFunctions'
import { CORE } from '../helpers/constants'

export class BrandServices {
    async getAllBrands() {
        return await db.brand.findMany({
            include: {
                _count: true,
            },
        })
    }

    async getBrand({ name }: Request['params']) {
        return await db.brand.findUnique({
            where: {
                name,
            },
            include: {
                _count: true,
            },
        })
    }

    async brandUpdate({ params, file, body }: Request) {
        if (file) {
            deleteFile({
                nameFolder: CORE,
                fileName: body.oldLogo.split('/').at(-1) as string,
            })

            writeNewFile(file, {
                nameFolder: CORE,
                fileName: body.logo.split('/').at(-1) as string,
            })

            return await db.brand.update({
                where: {
                    name: params.name,
                },
                data: {
                    name: body.name,
                    logo: body.logo,
                },
            })
        }

        return await db.brand.update({
            where: {
                name: params.name,
            },
            data: {
                name: body.name,
            },
        })
    }

    async addBrand({ file, body }: Request) {
        const newBrand = body as BrandSchema

        writeNewFile(file, {
            nameFolder: CORE,
            fileName: newBrand.logo.split('/').at(-1) as string,
        })

        return await db.brand.create({
            data: newBrand,
        })
    }

    async changeBrandAvailability({ params, body }: Request) {
        return await db.brand.update({
            where: {
                name: params.name,
            },
            data: {
                disabled: body.disabled,
            },
        })
    }

    async deleteBrand({ name }: Request['params']) {
        const brand = await db.brand.findUnique({
            where: {
                name,
            },
        })

        if (!brand) return null

        deleteFile({
            nameFolder: CORE,
            fileName: brand.logo.split('/').at(-1) as string,
        })

        return await db.brand.delete({
            where: {
                name,
            },
        })
    }
}

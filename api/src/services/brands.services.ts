import type { Request } from 'express'
import type { BrandSchema } from '../types'

import { db } from '../database'
import { deleteFile, writeNewFile } from '../helpers/fsFunctions'
import { BRANDS_PATH } from '../helpers/constants'

export class BrandServices {
    async getAllBrands() {
        return await db.brand.findMany({
            include: {
                _count: true,
            },
        })
    }

    async brandUpdate({ file, params, body }: Request) {
        if (file) {
            deleteFile(params.oldFile)
            body.logo = writeNewFile(file, BRANDS_PATH)
        }

        return await db.brand.update({
            where: {
                name: params.name,
            },
            data: body,
        })
    }

    async addBrand({ file, body }: Request) {
        const newBrand = body as BrandSchema

        return await db.brand.create({
            data: {
                ...newBrand,
                logo: writeNewFile(file, BRANDS_PATH),
            },
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

    async deleteBrand(brand: BrandSchema) {
        deleteFile(brand.logo)

        return await db.brand.delete({
            where: {
                name: brand.name,
            },
        })
    }
}

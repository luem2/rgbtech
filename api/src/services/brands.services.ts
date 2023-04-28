import type { Request } from 'express'
import type { BrandSchema } from '../types'

import { db } from '../database'
import { deleteFile } from '../helpers/fsFunctions'
import { CORE } from '../helpers/constants'

export class BrandServices {
    async getAllBrands() {
        return await db.brand.findMany({
            include: {
                _count: true,
            },
        })
    }

    async brandUpdate({ params, body }: Request) {
        return await db.brand.update({
            where: {
                name: params.name,
            },
            data: body,
        })
    }

    async addBrand(newBrand: BrandSchema) {
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

    async deleteBrand(brand: BrandSchema) {
        deleteFile({
            nameFolder: CORE,
            fileName: brand.logo.split('/').pop() as string,
        })

        return await db.brand.delete({
            where: {
                name: brand.name,
            },
        })
    }
}

import type { Request } from 'express'
import type { BrandSchema } from '../types'

import { db } from '../database'

class BrandsServices {
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
}

export default new BrandsServices()

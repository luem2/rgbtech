import type { AnySchema } from 'yup'

import { boolean, number, object, string } from 'yup'

export const querySchema = object({
    query: object({
        brand: string(),
        name: string(),
        price_gte: number().min(1).max(20000),
        price_lte: number().min(1).max(20000),
        rating: number().min(1).max(5).nullable(),
        rating_gte: number().min(1).max(5),
        rating_lte: number().min(1).max(5),
        tags: string(),
        onDiscount: boolean(),
        freeShipping: boolean(),
        sortBy: string().oneOf(
            ['brand', 'name', 'price', 'rating', 'stock'],
            'You con sort only by: brand, name, price, rating, stock'
        ),
        sortOrder: string().oneOf(
            ['asc', 'desc'],
            `The order can be 'asc' or 'desc' only.`
        ),
    }).noUnknown(),
}) as unknown as AnySchema

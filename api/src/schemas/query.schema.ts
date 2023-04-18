import { array, boolean, number, object, string } from 'yup'

export const querySchema = object({
    query: object({
        brand: string(),
        name: string(),
        price: object({
            greaterThan: number().min(1).max(20000),
            lessThan: number().min(1).max(20000),
        }),
        rating: object({
            greaterThan: number().min(1).max(20000),
            lessThan: number().min(1).max(20000),
            equals: number().min(1).max(20000),
        }),
        tags: array().of(string()),
        stock: object({
            greaterThan: number().min(1).max(20000),
            lessThan: number().min(1).max(20000),
        }),
        onDiscount: boolean(),
        freeShipping: boolean(),
        orderBy: object({
            value: string().oneOf([
                'brand',
                'name',
                'price',
                'rating',
                'stock',
            ]),
            order: string().oneOf(
                ['asc', 'desc'],
                `The order can be 'asc' or 'desc' only.`
            ),
        }),
    }),
}) as never

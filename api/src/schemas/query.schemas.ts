import type { AnySchema } from 'yup'

import { array, boolean, number, object, string } from 'yup'

export const querySchema = object({
    query: object({
        brand: string(),
        name: string(),
        // REFACTOR: [ ]
        // price: object({
        //     greaterThan: number().min(1).max(20000),
        //     lessThan: number().min(1).max(20000),
        // }),
        // REFACTOR: [ ]
        // rating: object({
        //     greaterThan: number().min(1).max(20000),
        //     lessThan: number().min(1).max(20000),
        //     equals: number().min(1).max(20000),
        // }),
        tags: string(),
        onDiscount: boolean(),
        freeShipping: boolean(),
        // TODO: VALIDAR QUE SI LLEGA POR QUERY SORTBY, TIENE QUE INEVITABLEMENTE TENER UN SORTORDER, SI LLEGA UN SORTORDER SE IGNORA O SE MANDA UN ERROR DICIENDO QUE FALTA EL SORTBY
        sortBy: string().oneOf(['brand', 'name', 'price', 'rating', 'stock']),
        sortOrder: string().oneOf(
            ['asc', 'desc'],
            `The order can be 'asc' or 'desc' only.`
        ),
    }).noUnknown(),
}) as unknown as AnySchema

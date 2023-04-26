import type { AnySchema } from 'yup'

import { object, string } from 'yup'

export const brandSchema = object({
    body: object({
        name: string().required('Name is required'),
    }).noUnknown(),
}) as unknown as AnySchema

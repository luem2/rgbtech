import type { AnySchema } from 'yup'

import { number, object, string } from 'yup'

export const awardSchema = object({
    body: object({
        id: string(),
        name: string().required('Name is required'),
        description: string().required('Description is required'),
        specifications: object().required('Specifications must be an object'),
        requiredPoints: number().required('Required Points is required'),
    }).noUnknown(),
}) as unknown as AnySchema

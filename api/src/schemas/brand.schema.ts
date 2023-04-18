import { object, string } from 'yup'

export const brandSchema = object({
    body: object({
        name: string().required('Name is required'),
        logo: string().required('Logo is required'),
    }),
}) as never

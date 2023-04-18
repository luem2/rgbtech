import { object, string } from 'yup'

export default object({
    body: object({
        email: string()
            .required('Email is required')
            .email('Must be a valid email'),
    }).noUnknown(),
}) as never

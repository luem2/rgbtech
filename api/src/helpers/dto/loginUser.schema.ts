import { object, string } from 'yup'

export default object({
    body: object({
        email: string()
            .email('Must be a valid email')
            .required('Email is required'),
        password: string().required('Password is required'),
    }),
}) as never

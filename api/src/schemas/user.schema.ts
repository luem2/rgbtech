import { date, object, string } from 'yup'

export const createUserSchema = object({
    body: object({
        firstName: string().required('Firstname is required'),
        lastName: string().required('Lastname is required'),
        email: string()
            .email('Must be a valid email')
            .required('Email is required'),
        password: string()
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
                'The password must contain at least one uppercase letter, one lowercase letter, one number and one special character.'
            )
            .required('Password is required'),
        nationality: string().required('Nationality is required'),
        birthDate: date()
            .min(new Date(1900, 0, 1))
            .required('Birthdate is required'),
    }),
}) as never

export const createUserSchemaWithGoogle = object({
    body: object({
        firstName: string().required('Firstname is required'),
        lastName: string().required('Lastname is required'),
        email: string()
            .email('Must be a valid email')
            .required('Email is required'),
        password: string().required(),
        picture: string().url().required(),
    }),
}) as never

export const editUserSchema = object({
    body: object({
        firstName: string().required('Firstname is required'),
        lastName: string().required('Lastname is required'),
        email: string()
            .email('Must be a valid email')
            .required('Email is required'),
        nationality: string().required('Nationality is required'),
        birthDate: date().min(new Date(1900, 0, 1)),
        // .required('Birthdate is required'),
    }),
}) as never

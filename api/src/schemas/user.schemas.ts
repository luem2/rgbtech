import type { AnySchema } from 'yup'

import { object, string } from 'yup'

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
        nationality: string()
            .matches(
                /^[A-Z]{3}$/,
                'Debe ser un código de país ISO de 3 caracteres válido'
            )
            .uppercase()
            .required('Nationality is required'),
        birthDate: string().required('Birthdate is required'),
    }).noUnknown(),
}) as unknown as AnySchema

export const editUserSchema = object({
    body: object({
        firstName: string().required('Firstname is required'),
        lastName: string().required('Lastname is required'),
        email: string()
            .email('Must be a valid email')
            .required('Email is required'),
        nationality: string()
            .matches(
                /^[A-Z]{3}$/,
                'Debe ser un código de país ISO de 3 caracteres válido'
            )
            .uppercase()
            .required('Nationality is required'),
        birthDate: string().required('Birthdate is required'),
    }).noUnknown(),
}) as unknown as AnySchema

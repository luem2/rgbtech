import { date, object, string } from 'yup'

export default object({
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
        nacionality: string().required('Nacionality is required'),
        picture: string().url().optional(),
        birthDate: date().optional().nullable().min(new Date(1900, 0, 1)),
    }),
}) as never

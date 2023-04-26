import type { AnySchema } from 'yup'

import { object, string } from 'yup'

export default object({
    body: object({
        newPassword: string()
            .required('Password is required')
            .min(8, 'The password must be at least 8 characters long')
            .max(16, 'The password must not be longer than 16 characters')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
                'The password must contain at least one uppercase letter, one lowercase letter, one number and one special character.'
            ),
    }).noUnknown(),
}) as unknown as AnySchema

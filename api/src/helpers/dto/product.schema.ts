import { array, boolean, number, object, string } from 'yup'

export const productSchema = object({
    body: object({
        name: string().required('Name is required'),
        price: number().required('Price is required'),
        description: string().required('Description is required'),
        specifications: object().required('Specifications must be an object'),
        picture: string().required('Picture is required'),
        stock: number().required('Stock is required'),
        onDiscount: boolean().required('OnDiscount is required'),
        discountPercentage: number().required('DiscountPercentage is required'),
        freeShipping: boolean().required('FreeShipping is required'),
        rating: number()
            .nullable()
            .required('Rating is required (can be null)'),
        tags: array().of(
            object({
                name: string().required(`Name is required`),
                disabled: boolean().required('Disabled boolean is required'),
            })
        ),
        brand: object({
            name: string().required('Name is required'),
            logo: string().required('Logo is required'),
            disabled: boolean().required('Disabled boolean is required'),
        }),
    }),
}) as never

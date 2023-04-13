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
        tags: array().of(string()),
        brand: string(),
    }),
}) as never

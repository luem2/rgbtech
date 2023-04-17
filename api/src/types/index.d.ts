import type { Prisma } from '@prisma/client'

export {}
declare global {
    namespace Express {
        export interface Request {
            userId: string
            userRole: string
            parsedQuery: Record<string, unknown>
        }
    }
}

export type UserWithCart = Prisma.UserGetPayload<{
    include: {
        shoppingCart: {
            include: {
                product: true
            }
        }
    }
}>

export interface IQueryParams {
    brand?: string

    name?: string

    price?: {
        greaterThan?: number
        lessThan?: number
    }

    rating?: {
        greaterThan?: number
        lessThan?: number
        equals?: number
    }

    tags?: string[]

    stock?: {
        greaterThan?: number
        lessThan?: number
    }

    onDiscount?: boolean

    freeShipping?: boolean

    orderBy?: {
        value: 'brand' | 'name' | 'price' | 'rating' | 'stock'
        order: 'asc' | 'desc'
    }
}

export interface ProductSchema {
    id?: string
    name: string
    price: number
    description: string
    specifications: Record<string, string>
    picture: string
    stock: number
    onDiscount: boolean
    discountPercentage: number
    freeShipping: boolean
    tags: string[]
    brand: string
}

export interface BrandSchema {
    name: string
    logo: string
}

import type { Prisma } from '@prisma/client'

export {}
declare global {
    namespace Express {
        interface Request {
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
    name?: string

    brand?: string

    price_gte?: number

    price_lte?: number

    rating?: number

    rating_gte?: number

    rating_lte?: number

    tag?: string

    onDiscount?: boolean

    freeShipping?: boolean

    sortBy?: 'brand' | 'name' | 'price' | 'rating' | 'stock'

    sortOrder?: 'asc' | 'desc'
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

export interface AwardSchema {
    id?: string
    name: string
    description: string
    specifications: Record<string, string>
    requiredPoints: number
    picture: string
}

export interface GoogleTokensResult {
    id_token: string
    expires_in: number
    access_token: string
    refresh_token: string
    scope: string
}

export type GetGoogleOAuthURLProps = 'login' | 'register'

import type { Prisma } from '@prisma/client'

export {}
declare global {
    namespace Express {
        export interface Request {
            userId: string
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

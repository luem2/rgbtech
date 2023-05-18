import type { NextFunction, Request, Response } from 'express'
import type { CartItem } from '@prisma/client'

import { BaseMiddlewares } from '../config/bases'
import { db } from '../database'

export class TransactionMiddlewares extends BaseMiddlewares {
    checkCreateOrder = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            const user = (await db.user.findUnique({
                where: {
                    id: req.userId,
                },
                select: {
                    shoppingCart: true,
                },
            })) as { shoppingCart: CartItem[] }

            if (!user.shoppingCart.length)
                throw new this.HttpError(400, 'Cart is empty')

            const newOrder = user.shoppingCart.map((p) => ({
                productId: p.productId,
                amount: p.quantity,
            }))

            req.body = newOrder

            next()
        } catch (error) {
            next(error)
        }
    }

    checkIfUserExists = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            const user = await db.user.findUnique({
                where: {
                    id: req.params.id,
                },
            })

            if (!user) throw new this.HttpError(404, 'User not found')

            next()
        } catch (error) {
            next(error)
        }
    }
}

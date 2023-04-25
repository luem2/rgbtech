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
        const user = (await db.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                shoppingCart: true,
            },
        })) as { shoppingCart: CartItem[] }

        if (!user.shoppingCart.length) {
            next(new this.HttpError(400, 'Cart is empty'))

            return
        }

        const newOrder = user.shoppingCart.map((p) => ({
            productId: p.productId,
            amount: p.quantity,
        }))

        req.body = newOrder

        next()
    }
}

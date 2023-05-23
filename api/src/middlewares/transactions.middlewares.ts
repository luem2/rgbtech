import type { NextFunction, Request, Response } from 'express'
import type { IPurchaseUnits } from '../types'

import { BaseMiddlewares } from '../config/bases'
import { db } from '../database'

export class TransactionMiddlewares extends BaseMiddlewares {
    checkCreateOrder = async (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        try {
            const user = await db.user.findUnique({
                where: {
                    id: req.userId,
                },
                select: {
                    shoppingCart: {
                        include: {
                            product: true,
                        },
                    },
                },
            })

            if (!user?.shoppingCart.length)
                throw new this.HttpError(400, 'Cart is empty')

            const newOrder = user.shoppingCart.map((p) => ({
                productId: p.productId,
                amount: p.quantity,
            }))

            req.body.newOrder = newOrder

            const paypalDetails: IPurchaseUnits = user.shoppingCart.map(
                (p) => ({
                    description:
                        'Please read the purchase details carefully to confirm your purchase. Thanks you for shopping at RGBTech.',
                    amount: {
                        currency_code: 'USD',
                        value: p.product.price.toString(),
                    },
                    items: user.shoppingCart.map((p) => ({
                        name: p.product.name,
                        description: p.product.description,
                        unit_amount: {
                            currency_code: 'USD',
                            value: p.product.price.toString(),
                        },
                        quantity: p.quantity.toString(),
                    })),
                })
            )

            req.body.paypalDetails = paypalDetails

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

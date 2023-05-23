import type { Request } from 'express'
import type { CreateOrderOutput } from '../types'

import { db } from '../database'
import { PaypalApi } from '../config/paypal'

export class TransactionServices {
    declare paypal

    constructor() {
        this.paypal = new PaypalApi()
    }

    async getAllUsersTransactions() {
        return await db.transactions.findMany({
            include: {
                _count: true,
                order: true,
            },
        })
    }

    async getUserTransactions({ id }: Request['params']) {
        return await db.user.findUnique({
            where: {
                id,
            },
            select: {
                transactions: true,
            },
        })
    }

    async createOrder({ userId, body }: Request): Promise<CreateOrderOutput> {
        const order = await this.paypal.createOrder(body.paypalDetails)

        await db.transactions.create({
            data: {
                userId,
                status: 'Pending',
                order: {
                    createMany: {
                        data: body.newOrder,
                    },
                },
            },
            include: {
                order: true,
            },
        })

        return order
    }

    async completeTransaction({ userId, body }: Request) {
        // await db.user.update({
        //     where: {
        //         id: userId,
        //     },
        //     data: {
        //         shoppingCart: {
        //             deleteMany: {},
        //         },
        //     },
        // })
        // return await db.transactions.create({})
    }

    async cancelTransaction({ userId, body }: Request) {
        // canceling transaction...
    }
}

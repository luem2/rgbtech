import type { Request, Response } from 'express'

import { BaseControllers } from '../config/bases'
import { TransactionServices } from '../services/transactions.services'

export class TransactionControllers extends BaseControllers<TransactionServices> {
    constructor() {
        super(TransactionServices)
    }

    getAllUsersTransactions = async (_req: Request, res: Response) => {
        const allTransactions = await this.services.getAllUsersTransactions()

        this.httpResponse.Ok(res, {
            msg: 'Transactions were successfully sent',
            transactions: allTransactions,
        })
    }

    getUserTransactions = async (req: Request, res: Response) => {
        const user = await this.services.getUserTransactions(req.params)

        this.httpResponse.Ok(res, {
            msg: 'Transactions were successfully sent',
            transactions: user?.transactions,
        })
    }

    createOrder = async (req: Request, res: Response) => {
        const newOrder = await this.services.createOrder(req)

        this.httpResponse.Created(res, {
            msg: 'Order successfully created',
            order: newOrder,
        })
    }

    completeTransaction = async (req: Request, res: Response) => {
        await this.services.completeTransaction(req.body)

        this.httpResponse.Ok(res, {
            msg: 'Transaction successfully completed',
            transaction: req.body,
        })
    }

    cancelTransaction = async (req: Request, res: Response) => {
        await this.services.cancelTransaction(req.body)

        this.httpResponse.Ok(res, {
            msg: 'Transaction successfully cancelled',
            transaction: req.body,
        })
    }
}

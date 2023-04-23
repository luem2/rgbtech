import type { Request, Response } from 'express'

import { BaseControllers } from '../config/bases'
import { TransactionServices } from '../services/transactions.services'

export class TransactionControllers extends BaseControllers<TransactionServices> {
    constructor() {
        super(TransactionServices)
    }

    getAllTransactions = async (_req: Request, res: Response) => {
        const allTransactions = await this.services.getAllTransactions()

        this.httpResponse.Ok(res, {
            msg: 'All transactions are successfully submitted',
            transactions: allTransactions,
        })
    }
}

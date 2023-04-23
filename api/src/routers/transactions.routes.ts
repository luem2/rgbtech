import { BaseRouter } from '../config/bases'
import { TransactionControllers } from '../controllers/transactions.controllers'
import { TransactionMiddlewares } from '../middlewares/transactions.middlewares'

export class TransactionRouter extends BaseRouter<
    TransactionControllers,
    TransactionMiddlewares
> {
    constructor() {
        super(TransactionControllers, TransactionMiddlewares)
        this.routes()
    }

    routes() {
        this.router.get(
            '/',
            this.auth.checkAdminAuth,
            this.controllers.getAllTransactions
        )
    }
}

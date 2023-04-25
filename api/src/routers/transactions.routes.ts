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

        this.router.get(
            '/:id',
            this.auth.checkAdminAuth,
            this.controllers.getTransactionsByUser
        )

        this.router.put(
            '/complete-transaction/:idTransaction',
            this.auth.checkAuth,
            this.controllers.completeTransaction
        )

        this.router.put(
            '/cancel-transaction/:idTransaction',
            this.auth.checkAuth,
            this.controllers.cancelTransaction
        )

        this.router.post(
            '/create-order',
            [this.auth.checkAuth, this.middlewares.checkCreateOrder],
            this.controllers.createOrder
        )
    }
}

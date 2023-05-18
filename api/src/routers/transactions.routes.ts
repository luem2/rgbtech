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
            this.controllers.getAllUsersTransactions
        )

        this.router.get(
            '/:id',
            this.auth.checkAdminAuth,
            this.middlewares.checkIfUserExists,
            this.controllers.getUserTransactions
        )

        this.router.post(
            '/create-order',
            this.auth.checkAuth,
            this.middlewares.checkCreateOrder,
            this.controllers.createOrder
        )

        this.router.put(
            '/complete-transaction/:id',
            this.auth.checkAuth,
            this.controllers.completeTransaction
        )

        this.router.put(
            '/cancel-transaction/:id',
            this.auth.checkAuth,
            this.controllers.cancelTransaction
        )
    }
}

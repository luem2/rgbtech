import { BaseMiddlewares } from '../config/bases'

export class TransactionMiddlewares extends BaseMiddlewares {
    checkAddTransaction = async () => {
        return 'Checking the transaction'
    }
}

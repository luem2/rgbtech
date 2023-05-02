import { Router } from 'express'

import { AuthRouter } from './auth.routes'
import { AwardRouter } from './awards.routes'
import { BrandRouter } from './brands.routes'
import { ProductRouter } from './products.routes'
import { TagRouter } from './tags.routes'
import { TransactionRouter } from './transactions.routes'
import { UserRouter } from './users.routes'

const router = Router()

router
    .use('/auth', new AuthRouter().router)

    .use('/awards', new AwardRouter().router)

    .use('/brands', new BrandRouter().router)

    .use('/products', new ProductRouter().router)

    .use('/tags', new TagRouter().router)

    .use('/transactions', new TransactionRouter().router)

    .use('/users', new UserRouter().router)

export default router

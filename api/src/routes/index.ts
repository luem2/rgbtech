import { Router } from 'express'

// import { create, capture, cancel } from '../controllers/paypal'

// import productsRoute from './product.route'
import authRoutes from './auth.route'
import usersRoutes from './users.route'
// import brandsRoutes from './brand.route'
// import tagsRoutes from './tag.route'
// import adminRoutes from './admin.route'
// import awardsRoutes from './awards.route'
// import Updates from './updates.route'
// import salesRoutes from './sales.route'
// import recoverPasswordRoutes from './recoverPassword.route'

const router = Router()

router

    // .use('/products', productsRoutes)

    .use('/auth', authRoutes)

    .use('/users', usersRoutes)

// .use('/brands', brandsRoute)

// .use('/tags', tagsRoute)

// .use('/admin', adminRoute)

// .use('/awards', awardsRoute)

// .use('/updates', Updates)

// .use('/sales', salesRoute)

// .use('/recoverPassword', recoverPasswordRouter)

// .post('/create-order', create)

// .get('/capture-order', capture)

// .get('/cancel-order', cancel)

export default router

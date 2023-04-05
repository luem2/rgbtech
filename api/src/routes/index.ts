import { Router } from 'express'

// import { create, capture, cancel } from '../controllers/paypal'

import productsRoutes from './products.route'
import authRoutes from './auth.route'
import usersRoutes from './users.route'
// import brandsRoutes from './brand.route'
// import tagsRoutes from './tag.route'
// import awardsRoutes from './awards.route'
// import Updates from './updates.route'
// import salesRoutes from './sales.route'
// import recoverPasswordRoutes from './recoverPassword.route'

const router = Router()

router

    .use('/products', productsRoutes)

    .use('/users', usersRoutes)

    .use('/auth', authRoutes)

// .use('/brands', brandsRoute)

// .use('/tags', tagsRoute)

// .use('/awards', awardsRoute)

// .use('/updates', Updates)

// .use('/sales', salesRoute)

// .use('/recoverPassword', recoverPasswordRouter)

/* TODO: Refactorizar las rutas a transactions */
/* REFACTOR: UNIFICAR TODO ESTO EN .use('/transactions) */

// .post('/create-order', create)

// .get('/capture-order', capture)

// .get('/cancel-order', cancel)

/* TODO: VER QUE MAS PUEDO AGREGAR EN ESTADISTICAS, VISITAS O ALGO NOVEDOSO. */

/* TODO:  GET - PUT (PARA MODIFICAR CUALQUIER COSA, HASTA SU PROPIEDAD DISABLED) - POST - PATCH (LOGICAL DELETE) -> USERS */
/* TODO: GET - PUT - POST - PATCH -> PRODUCTS */
/* TODO:  GET - PUT - POST -> AWARDS */
/* TODO: GET - PUT - POST - PATCH -> BRANDS */
/* TODO: GET - POST -> SALES/TRANSACTIONS */
/* TODO: GET - PUT - POST - PATCH -> TAGS */

export default router

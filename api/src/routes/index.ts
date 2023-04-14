import { Router } from 'express'

import productsRoutes from './products.route'
import authRoutes from './auth.route'
import usersRoutes from './users.route'
import brandsRoutes from './brands.route'
import tagsRoutes from './tags.route'
// import awardsRoutes from './awards.route'
// import salesRoutes from './sales.route'

const router = Router()

router

    .use('/products', productsRoutes)

    .use('/users', usersRoutes)

    .use('/auth', authRoutes)

    .use('/brands', brandsRoutes)

    .use('/tags', tagsRoutes)

// .use('/awards', awardsRoute)

// .use('/sales', salesRoute)

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

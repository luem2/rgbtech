import { Router } from 'express'

import productsRoutes from './products.route'
import authRoutes from './auth.route'
import usersRoutes from './users.route'
import brandsRoutes from './brands.route'
import tagsRoutes from './tags.route'
import awardsRoutes from './awards.route'
// import salesRoutes from './sales.route'

const router = Router()

router

    // TODO: PROBAR EN INSOMNIA TODAS LAS RUTAS DE NUEVO. (INTENTAR VULNERARLO DE CUALQUIER MANERA)
    // TODO: MODIFICAR TODAS LAS RESPUESTAS DE RESPUESTA EXPRESS, CAMBIARLO POR UN THROW QUE ENVIE EL STATUS CODE Y EL MENSAJE PARA ESTANDARIZAR LA RESPUESTA DEL SERVIDOR.
    // TODO: REFACTORIZAR MULTER, SOLO MANEJAR EL MULTER EN MEMORIA Y NO EN DISCO, Y CUANDO FINALICEN LAS VALIDACIONES, ESCRIBIR EN DISCO CON LA FUNCION.
    // TODO: ARREGLAR EL TIPADO DE LOS SCHEMAS, PARA QUE NO SEAN NEVER
    // TODO: SIMPLIFICAR LOS MIDDLEWARES PONER MAS FUNCIONES EN 1 (REFACTORIZAR)

    .use('/products', productsRoutes)

    .use('/users', usersRoutes)

    .use('/auth', authRoutes)

    .use('/brands', brandsRoutes)

    .use('/tags', tagsRoutes)

    .use('/awards', awardsRoutes)

// TODO: HACER TODO CREATE Y READ
// .use('/sales', salesRoute)

/* TODO: Refactorizar las rutas a transactions */
/* REFACTOR: UNIFICAR TODO ESTO EN .use('/transactions) */

// .post('/create-order', create)

// .get('/capture-order', capture)

// .get('/cancel-order', cancel)

/* TODO: VER QUE MAS PUEDO AGREGAR EN ESTADISTICAS, VISITAS O ALGO NOVEDOSO. */

export default router

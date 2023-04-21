import { Router } from 'express'

import productsRoutes from './products.routes'
import authRoutes from './auth.routes'
import { UserRouter } from './users.routes'
import brandsRoutes from './brands.routes'
import tagsRoutes from './tags.routes'
import awardsRoutes from './awards.routes'
// import salesRoutes from './sales.route'

const router = Router()

router

    // TODO: PROBAR EN INSOMNIA TODAS LAS RUTAS DE NUEVO. (INTENTAR VULNERARLO DE CUALQUIER MANERA)
    // TODO: MODIFICAR TODAS LAS RESPUESTAS DE RESPUESTA EXPRESS, CAMBIARLO POR UN THROW QUE ENVIE EL STATUS CODE Y EL MENSAJE PARA ESTANDARIZAR LA RESPUESTA DEL SERVIDOR.
    // TODO: REFACTORIZAR MULTER, SOLO MANEJAR EL MULTER EN MEMORIA Y NO EN DISCO, Y CUANDO FINALICEN LAS VALIDACIONES, ESCRIBIR EN DISCO CON LA FUNCION.
    // TODO: ARREGLAR EL TIPADO DE LOS SCHEMAS, PARA QUE NO SEAN NEVER
    // TODO: SIMPLIFICAR LOS MIDDLEWARES PONER MAS FUNCIONES EN 1 (REFACTORIZAR)
    // TODO: AGREGAR FUNCION TRY/CATCH EN LOS CONTROLADORES
    // TODO: FIJARSE EL TEMA DE LOS NEXT Y LOS RETURNS DE LOS MIDDLEWARES, PROBAR

    .use('/products', productsRoutes)

    .use('/users', new UserRouter().router)

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

export default router

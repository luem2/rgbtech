import { Router } from 'express'

import { ProductRouter } from './products.routes'
import { UserRouter } from './users.routes'
import { AuthRouter } from './auth.routes'
import { BrandRouter } from './brands.routes'
import { TagRouter } from './tags.routes'
import { AwardRouter } from './awards.routes'
import { TransactionRouter } from './transactions.routes'

const router = Router()

router

    // TODO: PROBAR EN INSOMNIA TODAS LAS RUTAS DE NUEVO. (INTENTAR VULNERARLO DE CUALQUIER MANERA)
    // TODO: MODIFICAR TODAS LAS RESPUESTAS DE RESPUESTA EXPRESS, CAMBIARLO POR UN THROW QUE ENVIE EL STATUS CODE Y EL MENSAJE PARA ESTANDARIZAR LA RESPUESTA DEL SERVIDOR.
    // TODO: REFACTORIZAR MULTER, SOLO MANEJAR EL MULTER EN MEMORIA Y NO EN DISCO, Y CUANDO FINALICEN LAS VALIDACIONES, ESCRIBIR EN DISCO CON LA FUNCION.
    // TODO: ARREGLAR EL TIPADO DE LOS SCHEMAS, PARA QUE NO SEAN NEVER
    // TODO: SIMPLIFICAR LOS MIDDLEWARES PONER MAS FUNCIONES EN 1 (REFACTORIZAR)
    // TODO: AGREGAR FUNCION TRY/CATCH EN LOS CONTROLADORES
    // TODO: FIJARSE EL TEMA DE LOS NEXT Y LOS RETURNS DE LOS MIDDLEWARES, PROBAR
    // TODO: AGREGAR VALIDACION SOBRE COMENTARIO DE PRODUCTO (QUE PUEDA SOLAMENTE COMENTAR 1 VEZ Y SI LO HA COMPRADO)
    // TODO: CREAR NUEVO ARCHIVO DE AUTH MIDDLEWARES PARA VER SI SE VA EL BUG DE BASEMIDDLEWARE
    // TODO: AUTOMATIZAR EL TEMA DEL SEED DE PRODUCTOS (POR EJEMPLO, CREAR AUTOMATICAMENTE EL NOMBRE DEL ARCHIVO LEYENDO CON FS PARA NO TENER QUE PONERLO MANUALMENTE DENTRO DEL JSON)
    // TODO: DELETE USER
    // TODO: VER SI HAY QUE MODIFICAR EL SCHEMA DE TRANSACTIONS

    .use('/products', new ProductRouter().router)

    .use('/users', new UserRouter().router)

    .use('/auth', new AuthRouter().router)

    .use('/brands', new BrandRouter().router)

    .use('/tags', new TagRouter().router)

    .use('/awards', new AwardRouter().router)

    .use('/transactions', new TransactionRouter().router)

export default router

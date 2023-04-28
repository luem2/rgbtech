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

    // TODO: PROBAR EN POSTMAN TODAS LAS RUTAS DE NUEVO. (INTENTAR VULNERARLO DE CUALQUIER MANERA)
    // TODO: REFACTORIZAR MULTER, SOLO MANEJAR EL MULTER EN MEMORIA Y NO EN DISCO, Y CUANDO FINALICEN LAS VALIDACIONES, ESCRIBIR EN DISCO CON LA FUNCION.
    // TODO: AGREGAR VALIDACION SOBRE COMENTARIO DE PRODUCTO (QUE PUEDA SOLAMENTE COMENTAR 1 VEZ Y SI LO HA COMPRADO)
    // TODO: AUTOMATIZAR EL TEMA DEL SEED DE PRODUCTOS (POR EJEMPLO, CREAR AUTOMATICAMENTE EL NOMBRE DEL ARCHIVO LEYENDO CON FS PARA NO TENER QUE PONERLO MANUALMENTE DENTRO DEL JSON)
    // TODO: DELETE USER
    // TODO: HACER LA DOCUMENTACION EN POSTMAN.
    // TODO: HACER EL README.
    // TODO: AGREGAR STRIPE COMO METODO DE PAGO

    /* 
    
    [ ] USUARIO PAYPAL : luchemma@gmail.com > Contrasena.123
    [ ] Admin PAYPAL: rgbtech@admin.com > Contrasena.123
    
    */

    .use('/auth', new AuthRouter().router)

    .use('/awards', new AwardRouter().router)

    .use('/brands', new BrandRouter().router)

    .use('/products', new ProductRouter().router)

    .use('/tags', new TagRouter().router)

    .use('/transactions', new TransactionRouter().router)

    .use('/users', new UserRouter().router)

export default router

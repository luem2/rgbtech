const { Router } = require('express');
const ProductsMiddlewares =require('../middlewares/Product.js');
const UserMiddlewares = require('../middlewares/User.js');
const BrandMiddlewares = require('../middlewares/Brand.js');
const TagMiddlewares = require('../middlewares/Tag.js');
// const dogmiddleware = require('./middlewares/dogs.js')
// const temperamentmiddleware = require('./middlewares/temperaments.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use('/products' , ProductsMiddlewares)
router.use('/users' , UserMiddlewares)
router.use('/brands' , BrandMiddlewares)
router.use('/tags' , TagMiddlewares)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.use('/dogs', dogmiddleware);
// router.use('/temperaments', temperamentmiddleware);

module.exports = router;

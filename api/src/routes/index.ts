import { Router } from 'express'

import { create, capture, cancel } from '../controllers/paypal'

import productsRoute from './product.route'
import usersRoute from './user.route.js'
import brandsRoute from './brand.route.js'
import tagsRoute from './tag.route.js'
import adminRoute from './admin.route.js'
import awardsRoute from './awards.route.js'
import Updates from './updates.route.js'
import salesRoute from './sales.route.js'
import recoverPasswordRouter from './recoverPassword.route'

const router = Router()

router.use('/products', productsRoute)
router.use('/users', usersRoute)
router.use('/brands', brandsRoute)
router.use('/tags', tagsRoute)
router.use('/admin', adminRoute)
router.use('/awards', awardsRoute)
router.use('/updates', Updates)
router.use('/sales', salesRoute)
router.use('/recoverPassword', recoverPasswordRouter)
router.post('/create-order', create)
router.get('/capture-order', capture)
router.get('/cancel-order', cancel)

export default router

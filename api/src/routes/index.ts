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

/* TODO: Refactorizar las rutas a paypal */
/* REFACTOR: UNIFICAR TODO ESTO EN .use('/paypal) */

// .post('/create-order', create)

// .get('/capture-order', capture)

// .get('/cancel-order', cancel)

export default router

/* TODO: VER QUE MAS PUEDO AGREGAR EN ESTADISTICAS, VISITAS O ALGO NOVEDOSO. */

/* TODO:  GET - PUT (PARA MODIFICAR CUALQUIER COSA, HASTA SU PROPIEDAD DISABLED) - POST - PATCH (LOGICAL DELETE) -> USERS */
/* TODO: GET - PUT - POST - PATCH -> PRODUCTS */
/* TODO:  GET - PUT - POST -> AWARDS */
/* TODO: GET - PUT - POST - PATCH -> BRANDS */
/* TODO: GET - POST -> SALES/TRANSACTIONS */
/* TODO: GET - PUT - POST - PATCH -> TAGS */

// TODO: VER EN DONDE ENCAJAR TODO ESTO (PRODUCT, USER, TAG, BRAND, ETC..) Y PONERLE EL MIDDLEWARE DE AUTHADMIN
// .get('/dashboard', async (req, res) => {
//     const { year } = req.query
//     const conditions = {}
//     year ? (conditions.year = year) : null
//     let stock = await Product.findAll({
//         attributes: [[conn.fn('SUM', conn.col('stock')), 'totalStock']],
//     })
//     let totalSales = await Sale.findAll({
//         attributes: [
//             [conn.fn('SUM', conn.col('totalPrice')), 'totalSales'],
//         ],
//     })
//     stock = stock[0]
//     totalSales = totalSales[0]
//     const users = await User.findAndCountAll({
//         attributes: { exclude: ['password'] },
//     })
//     const sales = await Sale.findAll({
//         include: [
//             {
//                 model: Tag,
//                 through: { attributes: [] },
//             },
//         ],
//     })
//     const monthSales = {}
//     sales.forEach((sale) => {
//         const month = sale.month
//         if (!monthSales.hasOwnProperty(month)) {
//             monthSales[month] = sale.totalPrice
//         } else {
//             monthSales[month] = monthSales[month] + sale.totalPrice
//         }
//     })
//     const monthProducts = {}
//     sales.forEach((sale) => {
//         const month = sale.month
//         if (!monthProducts.hasOwnProperty(month)) {
//             monthProducts[month] = sale.amount
//         } else {
//             monthProducts[month] = monthProducts[month] + sale.amount
//         }
//     })
//     const ventasMes = []
//     for (const mes in monthSales) {
//         ventasMes.push({ month: mes, amount: monthSales[mes] })
//     }
//     const productosMes = []
//     for (const mes in monthProducts) {
//         productosMes.push({ month: mes, amount: monthProducts[mes] })
//     }
//     res.json({
//         monthSales: ventasMes,
//         monthProducts: productosMes,
//         sales: sales.length,
//         totalSales: totalSales.dataValues.totalSales,
//         stock: stock.dataValues.totalStock,
//         users: users.count,
//     })
// })
// .get('/products', async (req, res) => {
//     try {
//         const condition = {
//             where: {
//                 disabled: false,
//             },
//             include: {
//                 model: Tag,
//                 through: { attributes: [] },
//             },
//         }
//         const products = await Product.findAll(condition)
//         if (products.length === 0) return res.status(200).send(products)
//         const final = { response: [] }
//         products.map(async (product, index) => {
//             const brandName = await Brand.findByPk(
//                 product.dataValues.brandId
//             )
//             const objeto = {
//                 ...product.dataValues,
//                 brand: {
//                     name: brandName.dataValues.name,
//                     id: product.dataValues.brandId,
//                 },
//             }
//             final.response.push(objeto)
//             if (products.length == index + 1) {
//                 res.status(200).send(final)
//             }
//         })
//     } catch (error) {
//         res.sendStatus(500)
//     }
// })
// .get('/tags-brands', async (req, res) => {
//     try {
//         const tags = await Tag.findAll({
//             attributes: ['id', 'name'],
//             where: {
//                 disabled: false,
//             },
//         })
//         const brands = await Brand.findAll({
//             attributes: ['id', 'name'],
//             where: {
//                 disabled: false,
//             },
//         })
//         const response = {
//             brands,
//             tags,
//         }
//         res.status(200).send(response)
//     } catch (error) {
//         res.status(500).send('Internal error server')
//     }
// })
// .get('/users', async (req, res) => {
//     try {
//         const users = await User.findAndCountAll({
//             attributes: {
//                 exclude: [
//                     'password',
//                     'cartShop',
//                     'favorite',
//                     'shoppingHistory',
//                 ],
//             },
//         })
//         res.json(users)
//     } catch (error) {
//         res.sendStatus(500)
//     }
// })
// .put('/users/roles', async (req, res) => {
//     try {
//         const { id, isAdmin } = req.body
//         await User.update(
//             {
//                 isAdmin: !isAdmin,
//             },
//             {
//                 where: {
//                     id,
//                 },
//             }
//         )
//         res.sendStatus(201)
//     } catch (error) {
//         res.sendStatus(500)
//     }
// })
// .put('/products/state', async (req, res) => {
//     try {
//         const { id, disabled } = req.body
//         await Product.update(
//             {
//                 disabled: !disabled,
//             },
//             {
//                 where: {
//                     id,
//                 },
//             }
//         )
//         res.send('State updated')
//     } catch (error) {
//         res.sendStatus(500)
//     }
// })
// // router.post('/products/admin-update', async (req, res) => {
// // 	console.log('entro')
// // 	try {
// // 		console.log(req.body)
// // 		const { id, name, price, stock, description, onDiscount, discountPercentage, specifications, img, freeShipping } = req.body
// // 		Product.update({
// // 			id,
// // 			name,
// // 			price,
// // 			stock,
// // 			description,
// // 			onDiscount,
// // 			discountPercentage,
// // 			specifications,
// // 			img,
// // 			freeShipping
// // 		}, {
// // 			where: {
// // 				id: id
// // 			}
// // 		})
// // 	} catch (error) {
// // 		console.log(error)
// // 	}
// // });
// .post('/products/admin-update', async (req, res) => {
//     console.log('entro')
//     try {
//         console.log(req.body)
//         const {
//             id,
//             name,
//             price,
//             stock,
//             description,
//             onDiscount,
//             discountPercentage,
//             specifications,
//             img,
//             freeShipping,
//         } = req.body
//         Product.update(
//             {
//                 id,
//                 name,
//                 price,
//                 stock,
//                 description,
//                 onDiscount,
//                 discountPercentage,
//                 specifications,
//                 img,
//                 freeShipping,
//             },
//             {
//                 where: {
//                     id,
//                 },
//             }
//         )
//     } catch (error) {
//         console.log(error)
//     }
// })
// .put('/tags/update', async (req, res) => {
//     const { id, disabled } = req.body
//     try {
//         await Tag.update(
//             {
//                 disabled: !disabled,
//             },
//             {
//                 where: {
//                     id,
//                 },
//             }
//         )
//         res.sendStatus(200)
//     } catch (error) {
//         res.sendStatus(500)
//     }
// })

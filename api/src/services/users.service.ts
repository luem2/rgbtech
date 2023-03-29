import type { Request } from 'express'
import type { User } from '@prisma/client'

import { db } from '../database'

class UsersServices {
    async getAllUsers(): Promise<User[]> {
        return await db.user.findMany()
    }

    async updateProfile(req: Request): Promise<User> {
        return await db.user.update({
            where: {
                id: req.userId,
            },
            data: req.body,
        })
    }

    async changeProfilePhoto(req: Request): Promise<void> {
        await db.user.update({
            where: {
                id: req.userId,
            },
            data: {
                picture: req.file?.filename,
            },
        })
    }

    // shoppingCart GET - PUT - POST - DELETE

    // favorites GET - PUT - POST - DELETE

    // review GET - POST
}

export default new UsersServices()

// router.put('/setCart/:id', validateToken, async (req, res) => {
//     try {
//         console.log('entro al body')
//         const { id } = req.params
//         const user = await User.findByPk(id)
//         user.cartShop = [...user.cartShop, ...req.params]
//         res.sendStatus(201)
//     } catch (error) {
//         res.send(error)
//     }
// })

// router.put('/favourites/:id', async (req, res) => {
//     try {
//         const { id } = req.params
//         console.log(id)
//         const { newfavorite } = req.body
//         const user = await User.findByPk(id)
//         let favorite = user.dataValues.favorite
//         favorite == null ? (favorite = []) : null
//         if (!favorite?.length) {
//             favorite = newfavorite
//         } else {
//             favorite = [...favorite, newfavorite].flat()
//         }
//         await User.update(
//             {
//                 favorite,
//             },
//             {
//                 where: {
//                     id: id,
//                 },
//             }
//         )
//         res.send('Favoritos de usuario actualizado')
//     } catch (error) {
//         res.send(error)
//     }
// })

// router.put('/deletefavorite/:id', async (req, res, next) => {
//     try {
//         //Asegurarse de vaciar esta propiedad al ejecutar esta compra
//         const { id } = req.params
//         const { deletefavorite } = req.body
//         console.log(req.body, 'body delete')
//         console.log(deletefavorite, 'favorite delete')
//         await User.update(
//             {
//                 favorite: deletefavorite,
//             },
//             {
//                 where: {
//                     id: id,
//                 },
//             }
//         )
//         res.send('Favoritos de usuario actualizado')
//     } catch (error) {
//         next(error)
//     }
// })

// router.put('/puntuacion/:id', async (req, res, next) => {
//     try {
//         const { id } = req.params
//         let user = await User.findByPk(id)
//         console.log(req.body)
//         valor = req.body.RGBpoint
//         const newpuntuacion = user.RGBpoint + valor
//         await User.update(
//             {
//                 RGBpoint: newpuntuacion,
//             },
//             {
//                 where: {
//                     id: id,
//                 },
//             }
//         )
//         res.send('User Confirmations')
//     } catch (error) {
//         next(error)
//     }
// })

// router.put('/newproductcart/:id', async (req, res, next) => {
//     try {
//         const { id } = req.params
//         const { newproductcart } = req.body
//         const user = await User.findByPk(id)
//         let cartShop = user.dataValues.cartShop
//         cartShop == null ? (cartShop = []) : null
//         if (!cartShop?.length) {
//             cartShop = newproductcart
//         } else {
//             cartShop = [...cartShop, newproductcart].flat()
//         }
//         await User.update(
//             {
//                 cartShop,
//             },
//             {
//                 where: {
//                     id: id,
//                 },
//             }
//         )
//         res.send('Favoritos de usuario actualizado')
//     } catch (error) {
//         next(error)
//     }
// })
// router.put('/deleteproductcart/:id', async (req, res, next) => {
//     try {
//         //Asegurarse de vaciar esta propiedad al ejecutar esta compra
//         const { id } = req.params
//         const { deleteproductcart } = req.body
//         await User.update(
//             {
//                 cartShop: deleteproductcart,
//             },
//             {
//                 where: {
//                     id: id,
//                 },
//             }
//         )
//         res.send('Favoritos de usuario actualizado')
//     } catch (error) {
//         next(error)
//     }
// })

// router.put('/clearCart/:id', async (req, res, next) => {
//     try {
//         //Asegurarse de vaciar esta propiedad al ejecutar esta compra
//         const { id } = req.params
//         const { clearCart } = req.body
//         console.log(req.body, 'body delete')
//         console.log(clearCart, 'favorite delete')
//         await User.update(
//             {
//                 cartShop: clearCart,
//             },
//             {
//                 where: {
//                     id: id,
//                 },
//             }
//         )
//         res.send('Favoritos de usuario actualizado')
//     } catch (error) {
//         next(error)
//     }
// })

// // router.put("/setCart/:id", async (req, res, next) => {
// // 	try {
// // 		const { id } = req.params;
// // 		const { cartShop } = req.body;
// // 		await User.update(
// // 			{
// // 				cartShop: cartShop,
// // 			},
// // 			{
// // 				where: {
// // 					id: id,
// // 				},
// // 			}
// // 		);
// // 		res.send("User Confirmations");
// // 	} catch (error) {
// // 		next(error);
// // 	}
// // });

// router.get('/getShoppingHistory/:id', async (req, res, next) => {
//     try {
//         const { id } = req.params
//         console.log('asdsa')

//         const userShopHistory = await Sale.findAll({
//             where: {
//                 userId: id,
//             },
//         })
//         res.send(userShopHistory)
//     } catch (error) {
//         console.log(error)
//     }
// })

// router.put('/updateLastVisited/:id', validateToken, async (req, res, next) => {
//     try {
//         const { id } = req.params
//         const { idp } = req.body
//         console.log(id)
//         const user = await User.findByPk(id)
//         let lastVisited = user.dataValues.lastVisited
//         if (lastVisited && lastVisited.length > 13) {
//             lastVisited.splice(-1, 1)
//         }
//         await User.update(
//             {
//                 lastVisited: [idp, ...lastVisited],
//             },
//             {
//                 where: { id: id },
//             }
//         )
//         res.send('User Confirmations')
//     } catch (error) {
//         next(error)
//     }
// })

// export default router

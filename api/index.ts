//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import server from './src/app.js'
import { conn } from './src/db.js'
import createAllProducts from './src/Utils/createProducts.js'
import addBrands from './src/Utils/createBrands.js'
import addTags from './src/Utils/createTags.js'
import createUsers from './src/Utils/createUsers.js'
import createAllProductsOfAwards from './src/Utils/createAwards'

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
    addTags()
    addBrands()
    createAllProducts()
    createUsers()
    createAllProductsOfAwards()
    server.listen(3003, () => {
        console.log('%s listening at 3003') // eslint-disable-line no-console
    })
})

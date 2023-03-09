/* 
    ███████████     █████████  ███████████  ███████████ ██████████   █████████  █████   █████
    ░███    ░███  ███     ░░░  ░███    ░███░   ░███  ░  ░███  █ ░  ███     ░░░  ░███    ░███
    ░██████████  ░███          ░██████████     ░███     ░██████   ░███          ░███████████
    ░███░░░░░███ ░███    █████ ░███░░░░░███    ░███     ░███░░█   ░███          ░███░░░░░███
    ░███    ░███ ░░███  ░░███  ░███    ░███    ░███     ░███ ░   █░░███     ███ ░███    ░███
    █████   █████ ░░█████████  ███████████     █████    ██████████ ░░█████████  █████   █████
    ░░░░░   ░░░░░   ░░░░░░░░░  ░░░░░░░░░░░     ░░░░░    ░░░░░░░░░░   ░░░░░░░░░  ░░░░░   ░░░░░

                                            _..._
                                          .'     '.      _
                                       .-|   /:.   |  |   |
                                       |  \  |:.   /.-'-./
                                       | .-'-;:__.'    =/
                                       .'=  *=|      _.='
                                      /   _.  |    ;
                                     ;-.-'|    \   |
                                    /   | \    _\  _\
                                    \__/'._;.  ==' ==\
                                             \    \   |
                                             /    /   /
                                             /-._/-._/
                                            \   `\  \
                                              `-._/._/

*/

import Server from './config/server'

// import createAllProducts from './utils/createProducts.js'
// import addBrands from './utils/createBrands.js'
// import addTags from './utils/createTags.js'
// import createUsers from './utils/createUsers.js'
// import createAllProductsOfAwards from './utils/createAwards'

async function bootstrap(): Promise<void> {
    try {
        const server = new Server()

        server.listen()
    } catch (error) {
        console.error(error)
    }
}

bootstrap()

// conn.sync({ force: true }).then(() => {
//     addTags()
//     addBrands()
//     createAllProducts()
//     createUsers()
//     createAllProductsOfAwards()
//     server.listen(3003, () => {
//         console.info('%s listening at 3003')
//     })
// })

import { config } from '../../config/env'
import { db } from '..'

import { createUsers } from './users'
import { createTags } from './tags'
import { createAwards } from './awards'
import { createBrands } from './brands'
import { createProducts } from './products'

async function main(): Promise<void> {
    if (config.NODE_ENV === 'development') {
        await db.users.deleteMany()
        await createUsers()
    }

    await db.awards.deleteMany()
    await db.brands.deleteMany()
    await db.tags.deleteMany()
    await db.products.deleteMany()

    await createAwards()
    await createBrands()
    await createTags()
    await createProducts()

    console.info('Seeding completed 🌱')
}

try {
    main()
} catch (error) {
    console.error(error)
    process.exit(1)
} finally {
    const disconnect = async function (): Promise<void> {
        await db.$disconnect()
    }

    disconnect()
}

/* TODO: Probar luego de terminar la base de datos, las relaciones y los seeds..
        el rendimiento de el bloque de arriba con el de abajo
*/

// main()
//     .catch((error) => {
//         console.error(error)
//         process.exit(1)
//     })
//     .finally(async () => {
//         await db.$disconnect()
//     })

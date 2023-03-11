import { config } from '../../config/env'
import { db } from '../'

import { createUsers } from './users'

async function main(): Promise<void> {
    if (config.NODE_ENV === 'development') {
        await db.users.deleteMany({})
        await createUsers()
    }

    // await db.awards.deleteMany({})
    // await db.brands.deleteMany({})
    // await db.tags.deleteMany({})
    // await db.products.deleteMany({})

    console.info('ashei')
}
//
main()
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
    .finally(async () => {
        await db.$disconnect()
    })

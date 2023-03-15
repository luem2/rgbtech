import { config } from '../../config/env'
import { db } from '..'

import { createUsers } from './users'
import { createTags } from './tags'
import { createAwards } from './awards'
import { createBrands } from './brands'
import { createProducts } from './products'

async function main(): Promise<void> {
    if (config.NODE_ENV === 'development') {
        await db.user.deleteMany()
        await createUsers()
    }

    await db.award.deleteMany()
    await db.brand.deleteMany()
    await db.tag.deleteMany()
    await db.product.deleteMany()

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

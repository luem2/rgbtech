import { config } from '../../config'
import { db } from '..'

import { createCountries } from './countries'
import { createTags } from './tags'
import { createUsers } from './users'
import { createAwards } from './awards'
import { createBrands } from './brands'
import { createProducts } from './products'

async function main() {
    await db.country.deleteMany()
    await createCountries()

    if (config.NODE_ENV === 'development') {
        await db.user.deleteMany()
        await createUsers()
    }

    await db.tag.deleteMany()
    await createTags()

    await db.award.deleteMany()
    await createAwards()

    await db.brand.deleteMany()
    await createBrands()

    await db.product.deleteMany()
    await createProducts()
}

try {
    main()
} catch (error) {
    console.error(error)
    process.exit(1)
} finally {
    const disconnect = async function () {
        await db.$disconnect()
    }

    disconnect()
}

import { config } from '../../config/env'
import { db } from '..'

import { createCountries } from './countries'
import { createTags } from './tags'
import { createUsers } from './users'
import { createAwards } from './awards'
import { createBrands } from './brands'
import { createProducts } from './products'

async function main() {
    const countriesCount = await db.country.count()
    const usersCount = await db.user.count()
    const tagsCount = await db.tag.count()
    const awardsCount = await db.award.count()
    const brandsCount = await db.brand.count()
    const productsCount = await db.product.count()

    if (countriesCount !== 250) {
        await db.country.deleteMany()
        await createCountries()
    }

    if (usersCount < 17 && config.NODE_ENV === 'development') {
        await db.user.deleteMany()
        await createUsers()
    }

    if (tagsCount !== 19) {
        await db.tag.deleteMany()
        await createTags()
    }

    if (awardsCount !== 9) {
        await db.award.deleteMany()
        await createAwards()
    }

    if (brandsCount !== 29) {
        await db.brand.deleteMany()
        await createBrands()
    }

    if (productsCount !== 48) {
        await db.product.deleteMany()
        await createProducts()
    }
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

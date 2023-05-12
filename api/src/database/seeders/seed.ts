import { config } from '../../config'
import { db } from '..'

import { createCountries } from './countries'
import { createTags } from './tags'
import { createUsers } from './users'
import { createAwards } from './awards'
import { createBrands } from './brands'
import { createProducts } from './products'

type TableNamesArr = Array<{ tablename: string }>

async function truncateTables() {
    const tablenames =
        await db.$queryRaw<TableNamesArr>`SELECT tablename FROM pg_tables WHERE schemaname='public'`

    const tables = tablenames
        .map(({ tablename }) => tablename)
        .filter((name) => name !== '_prisma_migrations')
        .map((name) => `"public"."${name}"`)
        .join(', ')

    await db.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`)
}

async function main() {
    await createCountries()
    await createTags()
    await createAwards()
    await createBrands()
    await createProducts()

    if (config.NODE_ENV === 'development') {
        await createUsers()
    }
}

try {
    truncateTables()
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

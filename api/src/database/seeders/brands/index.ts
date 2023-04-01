import { db } from '../..'

import brands from './brands.json'

export async function createBrands() {
    try {
        await db.brand.createMany({
            data: brands,
        })

        console.info('☑️ Brands successfully seeded in the database')
    } catch (error) {
        console.error(error)
        process.exit(1)
    } finally {
        await db.$disconnect()
    }
}

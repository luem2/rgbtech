import { db } from '../../'

import productsJSON from './products.json'

export async function createProducts() {
    try {
        const products = productsJSON.map((product) => ({
            ...product,
            tags: product.tags.map((tag) => ({
                name: tag,
            })),
        }))

        products.forEach(async (product) => {
            await db.product.create({
                data: {
                    ...product,
                    tags: {
                        connect: product.tags,
                    },
                },
            })
        })

        console.info('☑️ Products successfully seeded in the database')
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

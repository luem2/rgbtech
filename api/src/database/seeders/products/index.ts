import { db } from '../../'

import productsJSON from './products.json'

export async function createProducts() {
    try {
        const products = productsJSON.map((product) => ({
            name: product.name,
            price: product.price,
            description: product.description,
            specifications: product.specifications,
            picture: product.picture,
            stock: product.stock,
            onDiscount: product.onDiscount,
            discountPercentage: product.discountPercentage,
            freeShipping: product.freeShipping,
            brandId: product.brandId,
            tags: product.tags.map((tag) => ({
                name: tag,
            })),
        }))

        await db.product.createMany({
            data: products,
        })

        console.info('☑️ Products successfully seeded in the database')
    } catch (error) {
        console.error(error)
        process.exit(1)
    } finally {
        await db.$disconnect()
    }
}

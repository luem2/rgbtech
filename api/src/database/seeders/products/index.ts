import { db } from '../../'

import products from './products.json'

export async function createProducts() {
    try {
        products.forEach(async (product) => {
            const tags = product.tags.map((tag) => {
                return {
                    name: tag,
                }
            })

            await db.product.create({
                data: {
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
                    tags: {
                        connect: tags,
                    },
                },
            })
        })

        console.info('☑️ Products successfully seeded in the database')
    } catch (error) {
        console.error(error)
        process.exit(1)
    } finally {
        await db.$disconnect()
    }
}

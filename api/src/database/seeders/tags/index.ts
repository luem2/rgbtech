import { db } from '../../'

import tags from './tags.json'

export async function createTags() {
    try {
        tags.forEach(async (tag) => {
            await db.tag.createMany({
                data: {
                    name: tag,
                },
            })
        })

        console.info('☑️ Tags successfully seeded in the database')
    } catch (error) {
        console.error(error)
        process.exit(1)
    } finally {
        await db.$disconnect()
    }
}

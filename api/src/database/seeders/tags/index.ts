import crypto from 'crypto'

import { db } from '../../'

import tags from './tags.json'

export async function createTags(): Promise<void> {
    try {
        tags.map((tag) => {
            const tagId = crypto.createHash('md5').update(tag).digest('hex')
            db.tags.create({
                name: tag,
                id: tagId,
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

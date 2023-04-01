import { db } from '../../'

import awards from './awards.json'

export async function createAwards() {
    try {
        await db.award.createMany({
            data: awards,
        })

        console.info('☑️ Awards successfully seeded in the database')
    } catch (error) {
        console.error(error)
        process.exit(1)
    } finally {
        await db.$disconnect()
    }
}

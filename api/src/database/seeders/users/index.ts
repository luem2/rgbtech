import { hashSync } from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

import { db } from '../../'

import usersJSON from './users.json'

export async function createUsers(): Promise<void> {
    try {
        const users = usersJSON.map((user) => {
            return {
                ...user,
                password: hashSync(user.password, 10),
                id: uuidv4(),
            }
        })

        await db.users.createMany({
            data: users,
        })

        console.info('☑️ Users successfully seeded in the database')
    } catch (error) {
        console.error(error)
        process.exit(1)
    } finally {
        await db.$disconnect()
    }
}

import type { Role } from '../../'

import { hashSync } from 'bcrypt'
import { faker } from '@faker-js/faker'

import { db } from '../../'

import usersJSON from './users.json'

function createRandomUsers() {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: hashSync('password123', 5),
        picture: faker.internet.avatar(),
        verificated: faker.helpers.arrayElement([true, false]),
        nacionality: faker.address.countryCode('alpha-3'),
        role: 'USER' as Role,
        RGBpoints: 2000,
    }
}

export async function createUsers() {
    try {
        const users = usersJSON.map((user) => {
            return {
                ...user,
                password: hashSync(user.password, 10),
                picture: faker.internet.avatar(),
                role: user.role as Role,
            }
        })

        Array.from({ length: 10 }).forEach(() => {
            users.push(createRandomUsers())
        })

        await db.user.createMany({
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

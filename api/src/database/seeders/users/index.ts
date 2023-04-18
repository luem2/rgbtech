import type { Role } from '../../'

import { hashSync } from 'bcrypt'
import { faker } from '@faker-js/faker'

import { db } from '../../'
import { DEFAULT_AVATAR } from '../../../helpers/constants'

import usersJSON from './users.json'

function createRandomUsers() {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: hashSync('password123', 5),
        picture: `/uploads/pictures/${DEFAULT_AVATAR}`,
        verificated: faker.helpers.arrayElement([true, false]),
        birthDate: faker.date.birthdate({ min: 18, max: 90, mode: 'age' }),
        nationality: faker.address.countryCode('alpha-3'),
        role: 'USER' as Role,
        RGBpoints: 2000,
    }
}

export async function createUsers() {
    try {
        const users = usersJSON.map((user) => {
            return {
                ...user,
                birthDate: new Date(user.birthDate),
                password: hashSync(user.password, 10),
                picture: `/uploads/pictures/${DEFAULT_AVATAR}`,
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

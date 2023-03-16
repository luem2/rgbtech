import type { Rol } from '../../'

import { hashSync } from 'bcrypt'
import { faker } from '@faker-js/faker'

import { db } from '../../'

import usersJSON from './users.json'

interface IUser {
    firstName: string
    lastName: string
    email: string
    password: string
    picture: string
    verificated: boolean
    nacionality: string
    rol: Rol
    RGBpoints: number
}

function createRandomUsers(): IUser {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        verificated: faker.helpers.arrayElement([true, false]),
        nacionality: faker.address.countryCode('alpha-3'),
        rol: 'USER' as Rol,
        RGBpoints: 2000,
    }
}

export async function createUsers(): Promise<void> {
    try {
        const users = usersJSON.map((user) => {
            return {
                ...user,
                password: hashSync(user.password, 10),
                picture: faker.internet.avatar(),
                rol: user.rol as Rol,
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

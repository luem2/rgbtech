import { PrismaClient } from '@prisma/client'

export type { Rol } from '@prisma/client'

export const db = new PrismaClient()

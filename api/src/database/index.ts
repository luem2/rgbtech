import { PrismaClient } from '@prisma/client'

export type { Role } from '@prisma/client'

export const db = new PrismaClient()

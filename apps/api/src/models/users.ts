import { db } from '@db'
import { users } from '@db/schema'

type UserBasic = typeof users.$inferInsert

export const findUserByEmail = (email: string) => db.query.users.findFirst({ where: { email } })

export const create = (user: UserBasic) => db.insert(users).values(user).returning()

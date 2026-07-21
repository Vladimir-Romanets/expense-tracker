import { db } from '@db'
import { users } from '@db/schema'

type UserBasic = typeof users.$inferInsert

const create = async (user: UserBasic) => {
  const result = await db.insert(users).values(user).returning()

  return result
}

export default {
  create,
}

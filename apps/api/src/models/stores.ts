import { db } from '@db'
import { stores } from '@db/schema'

type BasicStore = typeof stores.$inferInsert

export const create = async (payload: Pick<BasicStore, 'name'>) => {
  const result = await db.insert(stores).values(payload).returning()

  return result
}

export const getAllStores = () =>
  db.query.stores.findMany({
    orderBy: {
      name: 'asc',
    },
    columns: {
      id: true,
      name: true,
    },
  })

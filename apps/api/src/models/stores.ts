import { db } from '@db'
import { stores } from '@db/schema'
import { PaginationResult } from '@helpers/utils/pagination'

type BasicStore = typeof stores.$inferInsert

export const create = async (payload: Pick<BasicStore, 'name'>) => {
  const result = await db.insert(stores).values(payload).returning()

  return result
}

export const getAllStores = async ({ limit, offset }: PaginationResult) => {
  const promiseList = db.query.stores.findMany({
    limit,
    offset,
    orderBy: {
      name: 'asc',
    },
    columns: {
      id: true,
      name: true,
    },
  })
  const promiseCount = db.$count(stores)

  const [list, total] = await Promise.all([promiseList, promiseCount])

  return {
    list,
    total,
  }
}

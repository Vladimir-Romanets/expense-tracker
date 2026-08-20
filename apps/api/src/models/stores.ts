import { db } from '@db'
import { stores, NewStoreProps } from '@db/schema'
import { PaginationResult } from '@helpers/utils/pagination'
import { sql } from 'drizzle-orm'

export const create = async (payload: NewStoreProps) => {
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
      createdAt: true,
    },
  })
  const promiseCount = db.$count(stores)

  const [list, total] = await Promise.all([promiseList, promiseCount])

  return {
    list,
    total,
  }
}

export const getByName = async (name: string) => {
  const result = await db.query.stores.findFirst({
    where: {
      RAW: (table) => sql`lower(${table.name}) = ${name.toLowerCase()}`,
    },
  })

  return result
}

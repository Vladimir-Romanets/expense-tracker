import { asc } from 'drizzle-orm'
import { db } from '@db'
import { categories, NewCategoryProps } from '@db/schema'
import { PaginationResult } from '@helpers/utils/pagination'

export const create = async (payload: NewCategoryProps) =>
  await db.insert(categories).values(payload).returning()

export const getAllCategories = async ({ limit, offset }: PaginationResult) => {
  const reqCategories = db
    .select({
      id: categories.id,
      name: categories.name,
    })
    .from(categories)
    .orderBy(asc(categories.name))
    .limit(limit)
    .offset(offset)

  const reqTotal = db.$count(categories)

  const [list, total] = await Promise.all([reqCategories, reqTotal])

  return { list, total }
}

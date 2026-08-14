import { eq } from 'drizzle-orm'
import { db, type Executor } from '@db'
import { products, type NewProductProps, type ProductProps } from '@db/schema'
import type { PaginationResult } from '@helpers/utils/pagination'

export const getAll = async ({ limit, offset }: PaginationResult) => {
  const reqProducts = db.query.products.findMany({
    limit,
    offset,
    orderBy: {
      name: 'asc',
    },
    columns: {
      createdAt: false,
    },
    with: {
      categories: {
        columns: {
          name: true,
        },
      },
    },
  })

  const reqTotal = db.$count(products)

  const [list, total] = await Promise.all([reqProducts, reqTotal])

  return { list, total }
}

export const getByName = async (name: NewProductProps['name'], tx: Executor = db) =>
  await tx.query.products.findFirst({
    where: {
      name: {
        ilike: name,
      },
    },
  })

export const createIfNotExists = async (payload: NewProductProps, tx: Executor = db) =>
  await tx
    .insert(products)
    .values({ ...payload, name: payload.name.toLowerCase() })
    .onConflictDoUpdate({
      target: products.name,
      set: { name: payload.name.toLowerCase() },
    })
    .returning()

export const getById = async (id: ProductProps['id'], tx: Executor = db) =>
  await tx.query.products.findFirst({
    where: { id },
  })

export const update = async (
  id: ProductProps['id'],
  payload: Pick<NewProductProps, 'name' | 'categoryId'>,
  tx: Executor = db,
) =>
  await tx
    .update(products)
    .set({ ...payload, name: payload.name.toLowerCase() })
    .where(eq(products.id, id))
    .returning()

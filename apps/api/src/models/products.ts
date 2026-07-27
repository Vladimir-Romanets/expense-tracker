import { db, Executor } from '@db'
import { products, NewProductProps, ProductProps } from '@db/schema'
import { eq } from 'drizzle-orm'

export const createIfNotExists = async (payload: NewProductProps, tx: Executor = db) =>
  await tx
    .insert(products)
    .values({ ...payload, name: payload.name.toLowerCase() })
    .onConflictDoUpdate({
      target: products.name,
      set: { name: payload.name.toLowerCase() },
    })
    .returning()

export const getByName = async (name: NewProductProps['name'], tx: Executor = db) =>
  await tx.query.products.findFirst({
    where: {
      name: {
        ilike: name,
      },
    },
  })

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

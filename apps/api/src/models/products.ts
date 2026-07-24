import { db, Executor } from '@db'
import { products, NewProductProps } from '@db/schema'

export const createIfNotExists = async (payload: NewProductProps, tx: Executor = db) =>
  await tx
    .insert(products)
    .values(payload)
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

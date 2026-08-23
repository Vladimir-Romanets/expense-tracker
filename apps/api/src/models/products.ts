import { eq, ilike, and, type SQL, inArray } from 'drizzle-orm'
import { db, type Executor } from '@db'
import { products, type NewProductProps, type ProductProps } from '@db/schema'
import type { PaginationResult } from '@helpers/utils/pagination'
import type { BulkUpdateCategoryForProductDto, ProductQuery } from '@validators/products'

const allowedSortField = ['name']

export const getAll = async (filters: ProductQuery, { limit, offset }: PaginationResult) => {
  const { sortBy = 'name', sortOrder = 'asc', search, categoryId } = filters

  // START. This approach violates the DRY principle, but it works
  const whereConditions: SQL[] = [
    ...(search ? [ilike(products.name, `%${search}%`)] : []),
    ...(categoryId ? [eq(products.categoryId, categoryId)] : []),
  ]
  const whereFilter = {
    ...(search ? { name: { ilike: `%${search}%` } } : {}),
    ...(categoryId !== undefined ? { categoryId: { eq: categoryId } } : {}),
  }
  // END

  const whereClause = whereConditions.length ? and(...whereConditions) : undefined
  const sortField = allowedSortField.includes(sortBy) ? sortBy : 'name'
  const orderBy = {
    [sortField]: sortOrder,
  }

  const reqProducts = db.query.products.findMany({
    limit,
    offset,
    where: whereFilter,
    orderBy,
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

  const reqTotal = db.$count(products, whereClause)

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

export const updateBulkCategoryForProducts = async ({
  productIds,
  categoryId,
}: BulkUpdateCategoryForProductDto) => {
  return db
    .update(products)
    .set({
      categoryId,
    })
    .where(inArray(products.id, productIds))
    .returning({ id: products.id, categoryId: products.categoryId })
}

import { eq, ilike, and, type SQL, inArray, asc, desc, sql } from 'drizzle-orm'
import { db, type Executor } from '@db'
import { categories, products, type NewProductProps, type ProductProps } from '@db/schema'
import type { PaginationResult } from '@helpers/utils/pagination'
import type { BulkUpdateCategoryForProductDto, ProductQuery } from '@validators/products'

const sortColumns = {
  name: products.name,
  category: sql`lower(${categories.name})`,
} as const

export const getAll = async (filters: ProductQuery, pagination: PaginationResult) => {
  const { sortBy, sortOrder = 'asc', search, categoryId } = filters

  const whereConditions: SQL[] = [
    ...(search ? [ilike(products.name, `%${search}%`)] : []),
    ...(categoryId ? [eq(products.categoryId, categoryId)] : []),
  ]

  const whereClause = whereConditions.length ? and(...whereConditions) : undefined

  const direction = sortOrder === 'asc' ? asc : desc

  // Using builder API (not Relational) to support ORDER BY on joined stores.name
  const reqProducts = db
    .select({
      id: products.id,
      name: products.name,
      categoryId: products.categoryId,
      categoryName: categories.name,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(whereClause)
    .orderBy(direction(sortColumns[sortBy]), asc(products.id))
    .limit(pagination.limit)
    .offset(pagination.offset)

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

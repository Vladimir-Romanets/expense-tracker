import { and, eq, asc, desc, sql } from 'drizzle-orm'
import { NewReceiptProps, ReceiptProps, receipts, stores } from '@db/schema'
import { db, Executor } from '@db'
import type { PaginationResult } from '@helpers/utils/pagination'
import type { ReceiptsQuery } from '@validators/receipts'

type GetAllProps = {
  pagination: PaginationResult
  filter: ReceiptsQuery
  userId: number
}

const sortColumns = {
  purchaseDate: receipts.purchaseDate,
  totalAmount: receipts.totalAmount,
} as const

export const getAll = async ({ pagination, filter, userId }: GetAllProps) => {
  const { sortBy, sortOrder, storeId } = filter

  const whereClause = and(
    eq(receipts.userId, userId),
    ...(storeId ? [eq(receipts.storeId, storeId)] : []),
  )

  const direction = sortOrder === 'asc' ? asc : desc

  const orderColumn =
    sortBy === 'storeId' ? direction(sql`lower(${stores.name})`) : direction(sortColumns[sortBy])

  // Using builder API (not Relational) to support ORDER BY on joined stores.name
  const reqReceipts = db
    .select({
      id: receipts.id,
      purchaseDate: receipts.purchaseDate,
      totalAmount: receipts.totalAmount,
      imageKey: receipts.imageKey,
      store: {
        id: stores.id,
        name: stores.name,
      },
    })
    .from(receipts)
    .leftJoin(stores, eq(receipts.storeId, stores.id))
    .where(whereClause)
    .orderBy(orderColumn)
    .limit(pagination.limit)
    .offset(pagination.offset)

  const reqTotal = db.$count(receipts, whereClause)

  const [list, total] = await Promise.all([reqReceipts, reqTotal])

  return { list, total }
}

export const getById = async (id: number, userId: number) =>
  db.query.receipts.findFirst({
    where: {
      id,
      userId,
    },
    with: {
      items: {
        with: {
          products: {
            columns: {
              name: true,
            },
          },
        },
        columns: {
          productId: false,
        },
      },
    },
  })

export const create = async (payload: NewReceiptProps, tx: Executor = db) =>
  await tx.insert(receipts).values(payload).returning()

export const remove = async (id: number, userId: number) =>
  await db
    .delete(receipts)
    .where(and(eq(receipts.id, id), eq(receipts.userId, userId)))
    .returning({ id: receipts.id, imageKey: receipts.imageKey })

export const update = async (payload: Omit<ReceiptProps, 'createdAt'>, tx: Executor = db) =>
  tx
    .update(receipts)
    .set({
      imageKey: payload.imageKey,
      storeId: payload.storeId,
      purchaseDate: payload.purchaseDate,
      totalAmount: payload.totalAmount,
    })
    .where(and(eq(receipts.id, payload.id), eq(receipts.userId, payload.userId)))
    .returning()

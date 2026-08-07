import { and, eq } from 'drizzle-orm'
import { NewReceiptProps, receipts } from '@db/schema'
import { db, Executor } from '@db'
import { PaginationResult } from '@helpers/utils/pagination'

export const getAll = async ({ limit, offset }: PaginationResult, userId: number) => {
  const reqReceipts = db.query.receipts.findMany({
    where: {
      userId,
    },
    limit,
    offset,
    orderBy: {
      purchaseDate: 'desc',
    },
    columns: {
      createdAt: false,
      storeId: false,
      userId: false,
    },
    with: {
      store: {
        columns: {
          name: true,
          id: true,
        },
      },
    },
  })

  const reqTotal = db.$count(receipts, eq(receipts.userId, userId))

  const [list, total] = await Promise.all([reqReceipts, reqTotal])

  return { list, total }
}

export const create = async (payload: NewReceiptProps, tx: Executor = db) =>
  await tx.insert(receipts).values(payload).returning()

export const remove = async (id: number, userId: number) =>
  await db
    .delete(receipts)
    .where(and(eq(receipts.id, id), eq(receipts.userId, userId)))
    .returning({ id: receipts.id, imageKey: receipts.imageKey })

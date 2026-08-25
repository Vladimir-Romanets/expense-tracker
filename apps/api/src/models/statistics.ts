import { and, asc, between, eq } from 'drizzle-orm'
import { receipts } from '@db/schema'
import { db } from '@db'
import type { BasicExpenseForPeriodProps } from '@validators/statistics'

export const getBasicExpenseForPeriod = async (
  { startDate, endDate }: BasicExpenseForPeriodProps,
  userId: number,
) =>
  await db
    .select({
      id: receipts.id,
      totalAmount: receipts.totalAmount,
      purchaseDate: receipts.purchaseDate,
    })
    .from(receipts)
    .where(and(eq(receipts.userId, userId), between(receipts.purchaseDate, startDate, endDate)))
    .orderBy(asc(receipts.purchaseDate))

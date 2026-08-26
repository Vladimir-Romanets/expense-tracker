import { and, asc, between, desc, eq, sql } from 'drizzle-orm'
import { categories, products, receiptItems, receipts } from '@db/schema'
import { db } from '@db'
import type { PeriodFilterProps } from '@validators/statistics'

export const getBasicExpenseForPeriod = async (
  { startDate, endDate }: PeriodFilterProps,
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

export const getExpenseByCategories = async (
  { startDate, endDate }: PeriodFilterProps,
  userId: number,
) => {
  const totalSpent = sql<string>`sum(${receiptItems.totalPrice})`.as('total_spent')

  return await db
    .select({
      categoryId: categories.id,
      categoryName: categories.name,
      totalSpent,
    })
    .from(receipts)
    .innerJoin(receiptItems, eq(receiptItems.receiptId, receipts.id))
    .innerJoin(products, eq(products.id, receiptItems.productId))
    .leftJoin(categories, eq(categories.id, products.categoryId))
    .where(and(eq(receipts.userId, userId), between(receipts.purchaseDate, startDate, endDate)))
    .groupBy(categories.id, categories.name)
    .orderBy(desc(totalSpent))
}

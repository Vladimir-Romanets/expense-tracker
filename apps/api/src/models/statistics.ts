import { and, asc, between, desc, eq, sql } from 'drizzle-orm'
import { db } from '@db'
import { categories, products, receiptItems, receipts } from '@db/schema'
import type { PeriodFilterProps } from '@validators/statistics'

type UserAndDateRangeFilter = PeriodFilterProps & {
  userId: number
}

const selectByUserAndDateRange = ({ userId, startDate, endDate }: UserAndDateRangeFilter) =>
  and(eq(receipts.userId, userId), between(receipts.purchaseDate, startDate, endDate))

export const getBasicExpenseForPeriod = async (dateRange: PeriodFilterProps, userId: number) =>
  await db
    .select({
      id: receipts.id,
      totalAmount: receipts.totalAmount,
      purchaseDate: receipts.purchaseDate,
    })
    .from(receipts)
    .where(selectByUserAndDateRange({ ...dateRange, userId }))
    .orderBy(asc(receipts.purchaseDate))

export const getExpenseByCategories = async (dateRange: PeriodFilterProps, userId: number) => {
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
    .where(selectByUserAndDateRange({ ...dateRange, userId }))
    .groupBy(categories.id, categories.name)
    .orderBy(desc(totalSpent))
}

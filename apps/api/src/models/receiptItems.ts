import { db, Executor } from '@db'
import { receiptItems, type NewReceiptItemProps } from '@db/schema'
import { and, eq, notInArray, sql } from 'drizzle-orm'

type DeleteItemsProp = {
  receiptId: number
  items: number[]
}

export const addItems = async (payload: NewReceiptItemProps[], tx: Executor = db) =>
  await tx.insert(receiptItems).values(payload).returning()

export const updateItems = async (payload: NewReceiptItemProps[], tx: Executor = db) =>
  await tx
    .insert(receiptItems)
    .values(payload)
    .onConflictDoUpdate({
      target: receiptItems.id,
      set: {
        receiptId: sql`excluded.receipt_id`,
        productId: sql`excluded.product_id`,
        quantity: sql`excluded.quantity`,
        unitPrice: sql`excluded.unit_price`,
        totalPrice: sql`excluded.total_price`,
      },
    })
    .returning()

export const deleteExcludedItems = async (
  { receiptId, items }: DeleteItemsProp,
  tx: Executor = db,
) =>
  await tx
    .delete(receiptItems)
    .where(and(eq(receiptItems.receiptId, receiptId), notInArray(receiptItems.id, items)))

export const deleteItems = async (receiptId: number, tx: Executor = db) =>
  await tx.delete(receiptItems).where(eq(receiptItems.receiptId, receiptId))

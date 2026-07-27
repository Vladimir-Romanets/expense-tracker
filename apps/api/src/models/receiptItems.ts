import { db, Executor } from '@db'
import { receiptItems, NewReceiptItemProps } from '@db/schema'

export const addItems = async (payload: NewReceiptItemProps[], tx: Executor = db) =>
  await tx.insert(receiptItems).values(payload).returning()

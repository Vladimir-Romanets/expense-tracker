import { NewReceiptProps, receipts } from '@db/schema'
import { db, Executor } from '@db'

export const create = async (payload: NewReceiptProps, tx: Executor = db) =>
  await tx.insert(receipts).values(payload).returning()

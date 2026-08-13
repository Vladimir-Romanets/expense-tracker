import { Executor } from '@db/index'
import { receiptItemsModel } from '@models'
import type { NewReceiptItemProps } from '@db/schema'

type DeleteExcludedItemsPayload = { receiptId: number; items: number[] }

export const addItems = async (payload: NewReceiptItemProps[], tx?: Executor) => {
  const receiptItems = await receiptItemsModel.addItems(payload, tx)

  return receiptItems
}

export const updateItems = async (payload: NewReceiptItemProps[], tx?: Executor) => {
  const receiptItems = await receiptItemsModel.updateItems(payload, tx)

  return receiptItems
}

export const deleteExcludedItems = async (payload: DeleteExcludedItemsPayload, tx?: Executor) => {
  return await receiptItemsModel.deleteExcludedItems(payload, tx)
}

export const deleteItems = async (receiptId: number, tx?: Executor) => {
  return await receiptItemsModel.deleteItems(receiptId, tx)
}

import { Executor } from '@db/index'
import { NewReceiptItemProps } from '@db/schema'
import { receiptItemsModel } from '@models'

export const create = async (payload: NewReceiptItemProps) => {
  const [receiptItem] = await receiptItemsModel.create(payload)

  return receiptItem
}

export const addItemsCollection = async (payload: NewReceiptItemProps[], tx?: Executor) => {
  const receiptItems = await receiptItemsModel.addItems(payload, tx)

  return receiptItems
}

import { Executor } from '@db/index'
import { NewReceiptItemProps } from '@db/schema'
import { receiptItemsModel } from '@models'

export const addItemsCollection = async (payload: NewReceiptItemProps[], tx?: Executor) => {
  const receiptItems = await receiptItemsModel.addItems(payload, tx)

  return receiptItems
}

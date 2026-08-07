import { db } from '@db'
import { NewReceiptItemProps, ReceiptProps, StoreProps } from '@db/schema'
import { CreateReceiptDto } from '@validators/receipts'
import { receiptsModel } from '@models'
import { productsService, receiptItemsService } from '@services'
import {
  createPaginatedResponse,
  getPaginationParams,
  PaginationInput,
} from '@helpers/utils/pagination'
import { AppError } from '@helpers/errors/apiError'

type ReceiptsList = {
  store: Pick<StoreProps, 'id' | 'name'> | null
} & Omit<ReceiptProps, 'createdAt' | 'userId' | 'storeId'>

export const addFullReceiptData = async (
  { storeId, totalAmount, photoUrl, purchaseDate, items }: CreateReceiptDto,
  userId: number,
) => {
  return db.transaction(async (tx) => {
    const [receipt] = await receiptsModel.create(
      {
        userId,
        storeId,
        totalAmount: totalAmount.toFixed(2),
        purchaseDate,
        photoUrl,
      },
      tx,
    )

    const products = await Promise.all(
      items.map(({ name }) => productsService.checkAndInsert(name, tx)),
    )
    const mappedItems: NewReceiptItemProps[] = items.map((el, idx) => ({
      receiptId: receipt.id,
      productId: products[idx].id,
      totalPrice: el.totalPrice.toFixed(2),
      quantity: el.quantity?.toString(),
      unitPrice: el.unitPrice?.toFixed(2),
    }))
    const receiptItems = await receiptItemsService.addItemsCollection(mappedItems, tx)

    return {
      ...receipt,
      items: receiptItems,
    }
  })
}

export const getAll = async (payload: PaginationInput, userId: number) => {
  const pagination = getPaginationParams(payload)

  const { list, total } = await receiptsModel.getAll(pagination, userId)

  return createPaginatedResponse<ReceiptsList>(list, total, pagination)
}

export const remove = async (id: number, userId: number) => {
  const [deleted] = await receiptsModel.remove(id, userId)

  // Returns 404 for both non-existent and unauthorized receipts (intentional — avoids leaking ownership info)
  if (!deleted) throw new AppError('Receipt not found', 404)
}

import { db } from '@db'
import { NewReceiptItemProps } from '@db/schema'
import { CreateReceiptDto } from '@validators/receipts'
import { receiptsModel } from '@models'
import { productsService, receiptItemsService } from '@services'

export const addFullReceiptData = async (
  { storeId, totalAmount, purchaseDate, items }: CreateReceiptDto,
  userId: number,
) => {
  return db.transaction(async (tx) => {
    const [receipt] = await receiptsModel.create(
      {
        userId,
        storeId,
        totalAmount: totalAmount.toFixed(2),
        purchaseDate,
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

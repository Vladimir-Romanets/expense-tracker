import { db } from '@db'
import { receiptsModel } from '@models'
import { productsService, receiptItemsService, uploadsService } from '@services'
import { AppError } from '@helpers/errors/apiError'
import { createPaginatedResponse, getPaginationParams } from '@helpers/utils/pagination'
import type { NewReceiptItemProps, ReceiptProps, StoreProps } from '@db/schema'
import type { CreateReceiptDto, UpdateReceiptDto, ReceiptsQuery } from '@validators/receipts'

type ReceiptsList = {
  store: Pick<StoreProps, 'id' | 'name'> | null
} & Omit<ReceiptProps, 'createdAt' | 'userId' | 'storeId'>

type ReceiptPayloadToUpdate = {
  id: number
  userId: number
} & UpdateReceiptDto

export const addFullReceiptData = async (
  { storeId, totalAmount, imageKey, purchaseDate, items }: CreateReceiptDto,
  userId: number,
) => {
  return await db.transaction(async (tx) => {
    const [receipt] = await receiptsModel.create(
      {
        userId,
        storeId,
        totalAmount: totalAmount.toFixed(2),
        purchaseDate,
        imageKey,
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
    const receiptItems = await receiptItemsService.addItems(mappedItems, tx)

    return {
      ...receipt,
      items: receiptItems,
    }
  })
}

export const getAll = async (payload: ReceiptsQuery, userId: number) => {
  const pagination = getPaginationParams(payload)

  const { list, total } = await receiptsModel.getAll({
    pagination,
    userId,
    filter: payload,
  })

  return createPaginatedResponse<ReceiptsList>(list, total, pagination)
}

export const getById = async (id: number, userId: number) => {
  const receipt = await receiptsModel.getById(id, userId)

  if (!receipt) throw new AppError('Receipt not found', 404)

  const receiptUrl = receipt.imageKey ? await uploadsService.getImgLink(receipt.imageKey) : null
  const formattedItems = receipt.items.map(({ products, ...rest }) => ({
    ...rest,
    name: products?.name || null,
  }))
  return {
    ...receipt,
    items: formattedItems,
    receiptUrl,
  }
}

export const remove = async (id: number, userId: number) => {
  const [deleted] = await receiptsModel.remove(id, userId)

  // Returns 404 for both non-existent and unauthorized receipts (intentional — avoids leaking ownership info)
  if (!deleted) throw new AppError('Receipt not found', 404)

  if (deleted.imageKey) await uploadsService.deleteFile(deleted.imageKey, false)
}

export const update = async ({ items, ...rest }: ReceiptPayloadToUpdate) => {
  return await db.transaction(async (tx) => {
    const [receipt] = await receiptsModel.update(
      {
        id: rest.id,
        userId: rest.userId,
        storeId: rest.storeId,
        totalAmount: rest.totalAmount.toFixed(2),
        purchaseDate: rest.purchaseDate,
        imageKey: rest.imageKey || null,
      },
      tx,
    )

    if (!receipt) {
      return null
    }

    const products = await Promise.all(
      items.map(({ name }) => productsService.checkAndInsert(name, tx)),
    )

    const existedItemsId = items.map((el) => el.id).filter((id) => id !== undefined)

    if (existedItemsId.length) {
      await receiptItemsService.deleteExcludedItems(
        { receiptId: receipt.id, items: existedItemsId },
        tx,
      )
    } else {
      await receiptItemsService.deleteItems(receipt.id, tx)
    }

    const mappedItems = items.map((el, idx) => {
      const item = {
        receiptId: receipt.id,
        productId: products[idx].id,
        totalPrice: el.totalPrice.toFixed(2),
        quantity: el.quantity?.toString() || null,
        unitPrice: el.unitPrice?.toFixed(2) || null,
      }
      return el.id
        ? {
            id: el.id,
            ...item,
          }
        : item
    })

    const finalItems = mappedItems.length
      ? await receiptItemsService.updateItems(mappedItems, tx)
      : []

    return {
      ...receipt,
      items: finalItems,
    }
  })
}

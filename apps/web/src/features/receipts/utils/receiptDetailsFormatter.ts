import type { ReceiptFormValues } from '@/features/receipts/schemas'
import type { ParsedReceipt, ReceiptDetails } from '../types'

export const receiptDetailsFormatter = (
  rawReceipt: ReceiptDetails | ParsedReceipt
): ReceiptFormValues => {
  const date = rawReceipt.purchaseDate
    ? new Date(rawReceipt.purchaseDate)
    : new Date()

  const initValues = {
    storeId: rawReceipt.storeId ? Number(rawReceipt.storeId) : 0,
    purchaseDate: date.toISOString().slice(0, 16),
    totalAmount: Number(rawReceipt.totalAmount),
    items: rawReceipt.items.map((item) => ({
      id: item.id,
      name: item.name ?? '',
      quantity: item.quantity ? Number(item.quantity) : undefined,
      unitPrice: item.unitPrice ? Number(item.unitPrice) : undefined,
      totalPrice: Number(item.totalPrice),
    })),
    receiptFile: rawReceipt.receiptUrl,
    imageKey: rawReceipt.imageKey,
  }

  return initValues
}

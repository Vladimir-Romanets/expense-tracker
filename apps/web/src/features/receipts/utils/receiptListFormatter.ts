import type { ReceiptEntity } from '../types'

export const receiptsFormatter = (receipts: ReceiptEntity[]) =>
  receipts.map((receipt) => ({
    ...receipt,
    totalAmount: Number(receipt.totalAmount).toFixed(2),
    purchaseDate: new Date(receipt.purchaseDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
  }))

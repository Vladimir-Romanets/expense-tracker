'use server'

import { serverApiClient } from '@/lib/apiClient.server'
import type { PaginatedResponse } from '@/types/pagination'
import type { ReceiptEntity } from '../types'

export const getReceipts = async (): Promise<
  PaginatedResponse<ReceiptEntity>
> => {
  const response =
    await serverApiClient<PaginatedResponse<ReceiptEntity>>('/receipts')

  if (response.data) {
    response.data = response.data.map((receipt) => ({
      ...receipt,
      totalAmount: Number(receipt.totalAmount).toFixed(2),
      purchaseDate: new Date(receipt.purchaseDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    }))
  }

  return response
}

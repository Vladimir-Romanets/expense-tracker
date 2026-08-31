'use server'
import { notFound } from 'next/navigation'
import { serverApiClient } from '@/shared/api/apiClient.server'
import type { ReceiptDetails } from '../types'
import { receiptDetailsFormatter } from '../utils/receiptDetailsFormatter'
import { ReceiptFormValues } from '../schemas'

type Response = {
  imageKey?: string
} & ReceiptFormValues

export const getReceiptById = async (id: number): Promise<Response> => {
  try {
    if (id <= 0) notFound()

    const rawReceipt = await serverApiClient<ReceiptDetails>(`/receipts/${id}`)

    return receiptDetailsFormatter(rawReceipt)
  } catch (error: any) {
    if (error.status === 404) notFound()
    else throw error
  }
}

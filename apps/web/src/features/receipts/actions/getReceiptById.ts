'use server'

import { serverApiClient } from '@/lib/apiClient.server'
import type { ReceiptDetails } from '../types'

export const getReceiptById = async (id: number): Promise<ReceiptDetails> =>
  serverApiClient<ReceiptDetails>(`/receipts/${id}`)

'use server'

import { serverApiClient } from '@/lib/apiClient.server'
import type { PaginatedResponse, PaginationParams } from '@/types/pagination'
import type { ReceiptEntity } from '../types'

type Response = PaginatedResponse<ReceiptEntity>

export const getReceipts = async (
  params: PaginationParams
): Promise<Response> =>
  serverApiClient<Response>('/receipts', {
    params: params as Record<string, string | number>,
  })

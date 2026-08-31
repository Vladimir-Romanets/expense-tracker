'use server'

import { serverApiClient } from '@/shared/api/apiClient.server'
import type { PaginatedResponse, PaginationParams } from '@/shared/types/pagination'
import type { ReceiptEntity } from '../types'

type Response = PaginatedResponse<ReceiptEntity>

export const getReceipts = async (
  params: PaginationParams
): Promise<Response> =>
  serverApiClient<Response>('/receipts', {
    params: params as Record<string, string | number>,
  })

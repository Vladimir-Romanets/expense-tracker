'use server'

import { serverApiClient } from '@/lib/apiClient.server'
import type { PaginatedResponse } from '@/types/pagination'
import type { ReceiptEntity } from '../types'

export const getReceipts = async (): Promise<
  PaginatedResponse<ReceiptEntity>
> => serverApiClient<PaginatedResponse<ReceiptEntity>>('/receipts')

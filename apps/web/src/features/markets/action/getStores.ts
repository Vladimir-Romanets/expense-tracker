import { serverApiClient } from '@/lib/apiClient.server'
import type { PaginatedResponse, PaginationParams } from '@/types/pagination'
import type { StoreEntity } from '../types'

export const getStores = async (
  params?: PaginationParams
): Promise<PaginatedResponse<StoreEntity>> =>
  serverApiClient<PaginatedResponse<StoreEntity>>('/stores', {
    params: params as Record<string, string | number>,
    cache: 'force-cache',
    next: { tags: ['stores'] },
  })

import { serverApiClient } from '@/shared/api/apiClient.server'
import type {
  PaginatedResponse,
  PaginationParams,
} from '@/shared/types/pagination'
import type { StoreEntity } from '@/shared/types/store'

export const getStores = async (
  params?: PaginationParams
): Promise<PaginatedResponse<StoreEntity>> =>
  serverApiClient<PaginatedResponse<StoreEntity>>('/stores', {
    params: params as Record<string, string | number>,
  })

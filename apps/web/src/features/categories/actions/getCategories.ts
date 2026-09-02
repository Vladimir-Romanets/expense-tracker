import { serverApiClient } from '@/shared/api/apiClient.server'
import type {
  PaginatedResponse,
  PaginationParams,
} from '@/shared/types/pagination'
import type { CategoryEntity } from '../types'

export const getCategories = async (
  params: PaginationParams
): Promise<PaginatedResponse<CategoryEntity>> =>
  serverApiClient<PaginatedResponse<CategoryEntity>>('/categories', {
    params: params as Record<string, string | number>,
    next: { tags: ['categories'] },
  })

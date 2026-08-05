import { serverApiClient } from '@/lib/apiClient.server'
import type { PaginatedResponse, PaginationParams } from '@/types/pagination'
import type { CategoryEntity } from '../types'

export const getCategories = async (
  params?: PaginationParams
): Promise<PaginatedResponse<CategoryEntity>> =>
  serverApiClient<PaginatedResponse<CategoryEntity>>('/categories', {
    params: params as Record<string, string | number>,
  })

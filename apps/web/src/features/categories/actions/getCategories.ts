'use server'

import { serverApiClient } from '@/lib/apiClient.server'
import type { PaginatedResponse, PaginationParams } from '@/types/pagination'
import type { Category } from '../types'

export const getCategories = async (
  params?: PaginationParams
): Promise<PaginatedResponse<Category>> => {
  return serverApiClient<PaginatedResponse<Category>>('/categories', {
    params: params as Record<string, string | number>,
  })
}

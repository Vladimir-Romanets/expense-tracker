import { serverApiClient } from '@/shared/api/apiClient.server'
import type { PaginatedResponse, PaginationParams } from '@/shared/types/pagination'
import type { ProductEntity } from '../types'

type Response = PaginatedResponse<ProductEntity>

export const getProducts = async (
  params: PaginationParams
): Promise<Response> =>
  serverApiClient<Response>('/products', {
    params: params as Record<string, string | number>,
  })

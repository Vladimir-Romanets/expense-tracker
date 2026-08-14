import { serverApiClient } from '@/lib/apiClient.server'
import type { PaginatedResponse, PaginationParams } from '@/types/pagination'
import type { ProductEntity } from '../types'

type Response = PaginatedResponse<ProductEntity>

export const getProducts = async (
  params: PaginationParams
): Promise<Response> =>
  serverApiClient<Response>('/products', {
    params: params as Record<string, string | number>,
  })

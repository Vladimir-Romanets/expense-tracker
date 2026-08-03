export interface PaginatedMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginatedMeta
}

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginationInput {
  page?: string | number
  limit?: string | number
}

export interface PaginationOptions {
  defaultLimit?: number
  maxLimit?: number
  defaultPage?: number
}

export interface PaginationResult {
  page: number
  limit: number
  offset: number
}

/**
 * Helper function to parse, validate, and convert pagination URL parameters into database query parameters.
 *
 * @param params Object containing query/path parameters (page, limit)
 * @param options Custom options for defaultPage, defaultLimit, and maxLimit
 * @returns PaginationResult containing parsed page, limit, and calculated DB offset
 */
export function getPaginationParams(
  params: PaginationInput = {},
  options: PaginationOptions = {},
): PaginationResult {
  const defaultPage = options.defaultPage ?? 1
  const defaultLimit = options.defaultLimit ?? 10
  const maxLimit = options.maxLimit ?? 100

  let page = Number(params.page)
  if (isNaN(page) || page < 1) {
    page = defaultPage
  } else {
    page = Math.floor(page)
  }

  let limit = Number(params.limit)
  if (isNaN(limit) || limit < 1) {
    limit = defaultLimit
  } else {
    limit = Math.floor(limit)
    if (limit > maxLimit) {
      limit = maxLimit
    }
  }

  const offset = (page - 1) * limit

  return {
    page,
    limit,
    offset,
  }
}

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

export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  pagination: PaginationResult,
): PaginatedResponse<T> {
  const totalPages = Math.ceil(total / pagination.limit) || 1

  return {
    data,
    meta: {
      page: pagination.page,
      limit: pagination.limit,
      total,
      totalPages,
      hasNextPage: pagination.page < totalPages,
      hasPrevPage: pagination.page > 1,
    },
  }
}

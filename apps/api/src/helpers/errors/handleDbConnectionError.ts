import { AppError } from '@helpers/errors/apiError'
import type { DrizzleQueryError } from './types'

const CONNECTION_ERROR_CODES = new Set([
  'ECONNREFUSED',
  'ETIMEDOUT',
  'ENOTFOUND',
  'ECONNRESET',
  'EHOSTUNREACH',
])

export const isDbConnectionError = (error: DrizzleQueryError): boolean => {
  return CONNECTION_ERROR_CODES.has(error.cause?.code ?? '')
}

export const handleDbConnectionError = (): AppError => {
  return new AppError('Service temporarily unavailable. Please try again later.', 503)
}

import { AppError } from '@helpers/errors/apiError'
import { DrizzleQueryError } from './types'

export const handleDbConstraintError = (error: DrizzleQueryError): AppError | DrizzleQueryError => {
  const code = error.cause?.code
  switch (code) {
    case '23505': // unique_violation
      return new AppError(`${error.cause?.table ?? 'Resource'} with this name already exists`, 409)
    case '23503': // foreign_key_violation
      return new AppError('Referenced record not found or still in use', 409)
    case '23502': // not_null_violation
      return new AppError(`Missing required field: ${error.cause?.column}`, 400)
    default:
      return error
  }
}

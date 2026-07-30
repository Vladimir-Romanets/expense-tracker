import { ZodError, ZodIssue } from 'zod'
import { AppError } from './apiError'

export const handleZodError = (err: ZodError): AppError => {
  const errors = err.issues.reduce((acc: Record<string, string>, issue: ZodIssue) => {
    const field = issue.path.join('.') || '_root'
    acc[field] = issue.message
    return acc
  }, {})

  const appError = new AppError('Validation failed', 400, errors)

  return appError
}

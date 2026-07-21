/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'
import { DrizzleError } from 'drizzle-orm'
import { AppError } from '@helpers/apiError'
import { handleDbConstraintError } from '@helpers/handleDbConstraintError'
import { handleJoiError } from '@helpers/handleJoiError'

interface CustomError extends Error {
  statusCode?: number
  status?: string
  isOperational?: boolean
  errors?: Record<string, string>
  isJoi?: boolean
  [key: string]: any
}

const sendErrorDev = (err: any, validationErr: CustomError | null, res: Response): void => {
  const statusCode = validationErr?.statusCode || err.statusCode || 500

  console.error('[DEV] Original error:', err, '\n', JSON.stringify(err))

  res.status(statusCode).json({
    status: validationErr?.status || err.status,
    message: validationErr?.message || err.message,
    stack: err.stack,
    errors: validationErr?.errors,
  })
}

const sendErrorProd = (err: CustomError, res: Response): void | Response => {
  if (err.isOperational) {
    return res.status(err.statusCode || 500).json({
      status: err.status,
      message: err.message,
      ...(err.errors && { errors: err.errors }),
    })
  }

  console.error('CRITICAL UNKNOWN ERROR 💥:', err)

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error. Please try again later.',
  })
}

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  let validationErr: AppError | DrizzleError | null = null

  if (err.isJoi || err.name === 'ValidationError') {
    validationErr = handleJoiError(err)
  } else if (err.name === 'DrizzleQueryError') {
    validationErr = handleDbConstraintError(err)
  }

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, validationErr, res)
  } else {
    const error: CustomError = validationErr || err

    sendErrorProd(error, res)
  }
}

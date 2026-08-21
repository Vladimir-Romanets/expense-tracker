/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'
import { DrizzleError } from 'drizzle-orm'
import { ZodError } from 'zod'
import multer from 'multer'
import { handleDbConstraintError } from '@helpers/errors/handleDbConstraintError'
import { handleZodError } from '@helpers/errors/handleZodError'
import { handleMulterError } from '@helpers/errors/handleMulterError'
import {
  handleDbConnectionError,
  isDbConnectionError,
} from '@helpers/errors/handleDbConnectionError'
import type { AppError } from '@helpers/errors/apiError'
import { config } from '@config'

interface CustomError extends Error {
  statusCode?: number
  status?: string
  isOperational?: boolean
  errors?: Record<string, string>
  [key: string]: any
}

const sendErrorDev = (err: any, validationErr: CustomError | null, res: Response): void => {
  const statusCode = validationErr?.statusCode || err.statusCode || 500

  console.error('[DEV] Original error:', err, '\n', JSON.stringify(err))

  res.status(statusCode).json({
    status: validationErr?.status || err.status,
    message: validationErr?.message || err.message,
    stack: err.stack,
    errors: validationErr?.errors || err.errors,
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
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  let validationErr: AppError | DrizzleError | null = null

  if (err instanceof ZodError) {
    validationErr = handleZodError(err)
  } else if (err instanceof multer.MulterError) {
    validationErr = handleMulterError(err)
  } else if (err.name === 'DrizzleQueryError' && isDbConnectionError(err)) {
    validationErr = handleDbConnectionError()
  } else if (err.name === 'DrizzleQueryError') {
    validationErr = handleDbConstraintError(err)
  }

  if (config.isDevelopment) {
    sendErrorDev(err, validationErr, res)
  } else {
    const error: CustomError = validationErr || err

    sendErrorProd(error, res)
  }
}

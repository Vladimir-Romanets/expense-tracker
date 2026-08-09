import rateLimit, { type Options } from 'express-rate-limit'
import { AppError } from '@helpers/errors/apiError'

const windowMs =
  process.env.RATE_LIMIT_WINDOW_MS !== undefined
    ? Number(process.env.RATE_LIMIT_WINDOW_MS)
    : 15 * 60 * 1000

const basicOptions: Pick<Options, 'windowMs' | 'standardHeaders' | 'legacyHeaders'> = {
  windowMs,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
}

export const globalLimiter = rateLimit({
  ...basicOptions,
  limit: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  handler: (_req, _res, next) => {
    next(new AppError('Too many requests from this IP, please try again later.', 429))
  },
})

export const loginLimiter = rateLimit({
  ...basicOptions,
  limit: Number(process.env.LOGIN_RATE_LIMIT_MAX) || 3,
  handler: (_req, _res, next) => {
    next(new AppError('Too many login attempts, please try again after 15 minutes.', 429))
  },
})

export const registerLimiter = rateLimit({
  ...basicOptions,
  limit: Number(process.env.REGISTER_RATE_LIMIT_MAX) || 5,
  handler: (_req, _res, next) => {
    next(new AppError('Too many registration attempts, please try again after 15 minutes.', 429))
  },
})

export const uploadLimiter = rateLimit({
  ...basicOptions,
  limit: Number(process.env.UPLOAD_RATE_LIMIT_MAX) || 10,
  handler: (_req, _res, next) => {
    next(new AppError('Upload limit reached, please try again later.', 429))
  },
})

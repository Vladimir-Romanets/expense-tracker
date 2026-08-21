import rateLimit, { type Options } from 'express-rate-limit'
import { AppError } from '@helpers/errors/apiError'
import { config } from '@config'

const basicOptions: Pick<Options, 'windowMs' | 'standardHeaders' | 'legacyHeaders'> = {
  windowMs: config.rateLimit.windowMs,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
}

export const globalLimiter = rateLimit({
  ...basicOptions,
  limit: config.rateLimit.globalMax,
  handler: (_req, _res, next) => {
    next(new AppError('Too many requests from this IP, please try again later.', 429))
  },
})

export const loginLimiter = rateLimit({
  ...basicOptions,
  limit: config.rateLimit.loginMax,
  handler: (_req, _res, next) => {
    next(new AppError('Too many login attempts, please try again after 15 minutes.', 429))
  },
})

export const registerLimiter = rateLimit({
  ...basicOptions,
  limit: config.rateLimit.registerMax,
  handler: (_req, _res, next) => {
    next(new AppError('Too many registration attempts, please try again after 15 minutes.', 429))
  },
})

export const uploadLimiter = rateLimit({
  ...basicOptions,
  limit: config.rateLimit.uploadMax,
  handler: (_req, _res, next) => {
    next(new AppError('Upload limit reached, please try again later.', 429))
  },
})

import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '@helpers/utils/jwt'
import { AppError } from '@helpers/errors/apiError'

export interface AuthRequest extends Request {
  userId?: number
}

export const authenticate = (req: AuthRequest, _res: Response, next: NextFunction) => {
  const token = req.cookies.token
  if (!token) {
    return next(new AppError('Authentication required', 401))
  }
  try {
    const payload = verifyToken(token)
    req.userId = payload.userId
    next()
  } catch {
    next(new AppError('Invalid or expired token', 401))
  }
}

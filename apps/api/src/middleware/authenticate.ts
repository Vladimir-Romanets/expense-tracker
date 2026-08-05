import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '@helpers/utils/jwt'

export interface AuthRequest extends Request {
  userId?: number
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' })
  }
  try {
    const payload = verifyToken(token)
    req.userId = payload.userId
    next()
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}

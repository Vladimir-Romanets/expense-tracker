import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '@helpers/jwt'

export interface AuthRequest extends Request {
  userId?: number
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }

  const token = header.split(' ')[1]
  try {
    const payload = verifyToken(token)
    req.userId = payload.userId
    next()
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}

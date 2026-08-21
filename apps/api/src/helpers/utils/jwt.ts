import jwt, { SignOptions } from 'jsonwebtoken'
import { config } from '@config'

interface JwtPayload {
  userId: number
}

export const signToken = (payload: JwtPayload) =>
  jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn as SignOptions['expiresIn'],
  })

export const verifyToken = (token: string): JwtPayload =>
  jwt.verify(token, config.jwt.secret) as JwtPayload

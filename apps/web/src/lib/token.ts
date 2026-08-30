import 'server-only'
import { jwtVerify, errors as joseErrors } from 'jose'

interface JwtPayload {
  userId: number
}

if (!process.env.JWT_SECRET) {
  throw new Error('[token] JWT_SECRET environment variable is not set')
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export const validateToken = async (token: string) => {
  try {
    await jwtVerify<JwtPayload>(token, secret, {
      algorithms: ['HS256'],
    })
    return true
  } catch (err) {
    if (err instanceof joseErrors.JOSEError) {
      return false
    }
    throw err
  }
}

import { Request, Response } from 'express'
import { authService } from '@services'
import { asyncHandler } from '@helpers/errors/asyncHandler'

const COOKIE_NAME = 'token'
const isProduction = process.env.NODE_ENV === 'production'
const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: (isProduction ? 'none' : 'lax') as 'none' | 'lax',
}

const setTokenCookie = (res: Response, token: string) => {
  const parsed = parseInt(process.env.COOKIE_MAX_AGE ?? '', 10)
  const maxAge = Number.isFinite(parsed) && parsed > 0 ? parsed : 3_600_000

  res.cookie(COOKIE_NAME, token, {
    ...cookieOptions,
    maxAge,
  })
}

export const register = asyncHandler(async (req: Request, res: Response) => {
  const response = await authService.registerUser(req.body)
  setTokenCookie(res, response.token)
  res.status(201).json({ user: response.user })
})

export const login = asyncHandler(async (req: Request, res: Response) => {
  const response = await authService.loginUser(req.body)
  setTokenCookie(res, response.token)
  res.status(200).json({ user: response.user })
})

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie(COOKIE_NAME, cookieOptions)
  res.status(200).json({ message: 'Logged out successfully' })
})

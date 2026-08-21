import { Request, Response } from 'express'
import { authService } from '@services'
import { asyncHandler } from '@helpers/errors/asyncHandler'
import { config } from '@config'

const COOKIE_NAME = 'token'
const cookieOptions = {
  httpOnly: true,
  secure: config.isProduction,
  sameSite: (config.isProduction ? 'none' : 'lax') as 'none' | 'lax',
}

const setTokenCookie = (res: Response, token: string) => {
  res.cookie(COOKIE_NAME, token, {
    ...cookieOptions,
    maxAge: config.cookie.maxAge,
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

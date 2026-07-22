import { Request, Response } from 'express'
import { authService } from '@services'
import { asyncHandler } from '@helpers/errors/asyncHandler'

export const register = asyncHandler(async (req: Request, res: Response) => {
  const response = await authService.registerUser(req.body)
  res.status(201).json(response)
})

export const login = asyncHandler(async (req: Request, res: Response) => {
  const response = await authService.loginUser(req.body)
  res.status(200).json(response)
})

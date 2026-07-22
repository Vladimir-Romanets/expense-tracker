import { Request, Response } from 'express'
import { storesService } from '@services'
import { asyncHandler } from '@helpers/asyncHandler'

export const create = asyncHandler(async (req: Request, res: Response) => {
  const store = await storesService.create(req.body)

  res.status(201).json(store)
})

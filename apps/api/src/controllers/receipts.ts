import { Response } from 'express'
import { asyncHandler } from '@helpers/errors/asyncHandler'
import { receiptsService } from '@services'
import { AuthRequest } from '@middleware/authenticate'

export const create = asyncHandler(async (req: AuthRequest, res: Response) => {
  const response = await receiptsService.addFullReceiptData(req.body, req.userId as number)

  res.status(201).json(response)
})

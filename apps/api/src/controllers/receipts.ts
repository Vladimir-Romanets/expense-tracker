import { Response } from 'express'
import { asyncHandler } from '@helpers/errors/asyncHandler'
import { receiptsService } from '@services'
import type { ValidatedRequest } from '../types/validator'
import type { ParamsIdReceiptDto } from '@validators/receipts'
import type { AuthRequest } from '@middleware/authenticate'

export const getAll = asyncHandler(async (req: AuthRequest, res: Response) => {
  const response = await receiptsService.getAll(req.query, req.userId as number)

  res.status(200).json(response)
})

export const getById = asyncHandler(
  async (req: ValidatedRequest<ParamsIdReceiptDto> & AuthRequest, res: Response) => {
    const response = await receiptsService.getById(req.params.id, req.userId as number)

    res.status(200).json(response)
  },
)

export const create = asyncHandler(async (req: AuthRequest, res: Response) => {
  const response = await receiptsService.addFullReceiptData(req.body, req.userId as number)

  res.status(201).json(response)
})

export const remove = asyncHandler(
  async (req: ValidatedRequest<ParamsIdReceiptDto> & AuthRequest, res: Response) => {
    await receiptsService.remove(req.params.id, req.userId as number)

    res.status(204).send()
  },
)

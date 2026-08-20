import type { Request, Response } from 'express'
import { asyncHandler } from '@helpers/errors/asyncHandler'
import { receiptsService } from '@services'
import type { ValidatedRequest } from '../types/validator'
import type { ParamsIdReceiptDto, UpdateIdReceiptDto, ReceiptsFilter } from '@validators/receipts'
import type { AuthRequest } from '@middleware/authenticate'
import { AppError } from '@helpers/errors/apiError'

export const getAll = asyncHandler(
  async (req: ValidatedRequest<ReceiptsFilter> & AuthRequest, res: Response) => {
    const response = await receiptsService.getAll(req.validatedQuery, req.userId as number)

    res.status(200).json(response)
  },
)

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

export const update = asyncHandler(
  async (req: ValidatedRequest<UpdateIdReceiptDto> & AuthRequest, res: Response) => {
    const payload = {
      id: req.params.id,
      userId: req.userId,
      ...req.body,
    }

    const receipt = await receiptsService.update(payload)

    if (!receipt) throw new AppError('Receipt not found', 404)

    res.status(200).json(receipt)
  },
)

export const parse = asyncHandler(async (req: Request & AuthRequest, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: 'Receipt screenshot not uploaded' })
    return
  }

  const parsedReceipt = await receiptsService.parse(req.file)

  if (!parsedReceipt) throw new AppError('Receipt can not be parsed', 404)

  res.status(200).json(parsedReceipt)
})

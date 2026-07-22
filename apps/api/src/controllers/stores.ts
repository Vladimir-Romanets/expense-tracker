import { Request, Response } from 'express'
import { storesService } from '@services'
import { asyncHandler } from '@helpers/errors/asyncHandler'
import { createPaginatedResponse, getPaginationParams } from '@helpers/utils/pagination'

export const create = asyncHandler(async (req: Request, res: Response) => {
  const store = await storesService.create(req.body)

  res.status(201).json(store)
})

export const getAllStores = asyncHandler(async (req: Request, res: Response) => {
  const pagination = getPaginationParams(req.query)

  const { list, total } = await storesService.getAllStores(pagination)

  res.status(200).json(createPaginatedResponse(list, total, pagination))
})

import { Request, Response } from 'express'
import { asyncHandler } from '@helpers/errors/asyncHandler'
import { categoriesService } from '@services'

export const create = asyncHandler(async (req: Request, res: Response) => {
  const category = await categoriesService.create(req.body)

  res.status(201).json(category)
})

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const response = await categoriesService.getAll(req.query)

  res.status(200).json(response)
})

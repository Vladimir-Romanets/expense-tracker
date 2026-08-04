import { Request, Response } from 'express'
import { asyncHandler } from '@helpers/errors/asyncHandler'
import { categoriesService } from '@services'
import { DeleteCategoryDto } from '@validators/categories'
import { ValidatedRequest } from '../types/validator'

export const create = asyncHandler(async (req: Request, res: Response) => {
  const category = await categoriesService.create(req.body)

  res.status(201).json(category)
})

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const response = await categoriesService.getAll(req.query)

  res.status(200).json(response)
})

export const remove = asyncHandler(
  async (req: ValidatedRequest<DeleteCategoryDto>, res: Response) => {
    await categoriesService.remove(req.params.id)

    res.status(204).send()
  },
)

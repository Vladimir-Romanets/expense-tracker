import { Request, Response } from 'express'
import { productsService } from '@services'
import { asyncHandler } from '@helpers/errors/asyncHandler'
import { AppError } from '@helpers/errors/apiError'

export const update = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
    throw new AppError('Invalid product id', 400)
  }

  const product = await productsService.update(id, req.body)

  res.status(200).json(product)
})

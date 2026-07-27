import { Response } from 'express'
import { productsService } from '@services'
import { asyncHandler } from '@helpers/errors/asyncHandler'
import { UpdateProductDto } from '@validators/products'
import { ValidatedRequest } from '../types/validator'

export const update = asyncHandler(
  async (req: ValidatedRequest<UpdateProductDto>, res: Response) => {
    const { id } = req.params
    const product = await productsService.update(id, req.body)

    res.status(200).json(product)
  },
)

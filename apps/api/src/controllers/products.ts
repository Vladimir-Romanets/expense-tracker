import type { Response } from 'express'
import { productsService } from '@services'
import { asyncHandler } from '@helpers/errors/asyncHandler'
import type {
  UpdateProductDto,
  ProductQueryBulkCategoryUpdate,
  ProductFilter,
} from '@validators/products'
import type { ValidatedRequest } from '../types/validator'
import type { AuthRequest } from '@middleware/authenticate'

export const getAll = asyncHandler(
  async (req: ValidatedRequest<ProductFilter> & AuthRequest, res: Response) => {
    const response = await productsService.getAll(req.validatedQuery)

    res.status(200).json(response)
  },
)

export const update = asyncHandler(
  async (req: ValidatedRequest<UpdateProductDto>, res: Response) => {
    const { id } = req.params
    const product = await productsService.update(id, req.body)

    res.status(200).json(product)
  },
)

export const updateBulkCategoryForProducts = asyncHandler(
  async (req: ValidatedRequest<ProductQueryBulkCategoryUpdate>, res: Response) => {
    const products = await productsService.updateBulkCategoryForProducts(req.body)

    res.status(200).json(products)
  },
)

import { Router } from 'express'
import { productsController } from '@controllers'
import {
  updateProductSchema,
  getProductFilterSchema,
  productQueryBulkCategoryUpdate,
} from '@validators/products'
import { validate } from '@middleware/validate'

const router = Router()

router.get('/', validate(getProductFilterSchema), productsController.getAll)
router.put('/:id', validate(updateProductSchema), productsController.update)
router.patch(
  '/category',
  validate(productQueryBulkCategoryUpdate),
  productsController.updateBulkCategoryForProducts,
)

export default router

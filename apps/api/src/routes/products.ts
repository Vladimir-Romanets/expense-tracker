import { Router } from 'express'
import { productsController } from '@controllers'
import { updateProductSchema, getProductFilterSchema } from '@validators/products'
import { validate } from '@middleware/validate'

const router = Router()

router.get('/', validate(getProductFilterSchema), productsController.getAll)
router.put('/:id', validate(updateProductSchema), productsController.update)

export default router

import { Router } from 'express'
import { productsController } from '@controllers'
import { updateProductSchema } from '@validators/products'
import { validate } from '@middleware/validate'

const router = Router()

router.put('/:id', validate(updateProductSchema), productsController.update)

export default router

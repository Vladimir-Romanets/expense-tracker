import { Router } from 'express'
import { productsController } from '@controllers'
import { updateProductSchema } from '@validators/products'
import { validate } from '@middleware/validate'
import { getPaginationSchema } from '@validators/pagination'

const router = Router()

router.get('/', validate(getPaginationSchema), productsController.getAll)
router.put('/:id', validate(updateProductSchema), productsController.update)

export default router

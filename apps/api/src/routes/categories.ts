import { Router } from 'express'
import { createCategoriesSchema } from '@validators/categories'
import { categoriesController } from '@controllers'
import { validate } from '@middleware/validate'

const router = Router()

router.post('/', validate(createCategoriesSchema), categoriesController.create)
router.get('/', categoriesController.getAll)

export default router

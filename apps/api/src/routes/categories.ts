import { Router } from 'express'
import { createCategoriesSchema, deleteCategorySchema } from '@validators/categories'
import { categoriesController } from '@controllers'
import { validate } from '@middleware/validate'

const router = Router()

router.post('/', validate(createCategoriesSchema), categoriesController.create)
router.get('/', categoriesController.getAll)
router.delete('/:id', validate(deleteCategorySchema), categoriesController.remove)

export default router

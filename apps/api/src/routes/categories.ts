import { Router } from 'express'
import { createCategoriesSchema, deleteCategorySchema } from '@validators/categories'
import { getPaginationSchema } from '@validators/pagination'
import { categoriesController } from '@controllers'
import { validate } from '@middleware/validate'

const router = Router()

router.post('/', validate(createCategoriesSchema), categoriesController.create)
router.get('/', validate(getPaginationSchema), categoriesController.getAll)
router.delete('/:id', validate(deleteCategorySchema), categoriesController.remove)

export default router

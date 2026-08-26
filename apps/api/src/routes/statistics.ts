import { Router } from 'express'
import { validate } from '@middleware/validate'
import { periodFilterQuerySchema } from '@validators/statistics'
import { statisticsController } from '@controllers'

const router = Router()

router.get(
  '/basic',
  validate(periodFilterQuerySchema),
  statisticsController.getBasicExpenseForPeriod,
)

router.get(
  '/categories',
  validate(periodFilterQuerySchema),
  statisticsController.getExpenseByCategories,
)

export default router

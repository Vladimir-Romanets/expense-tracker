import { Router } from 'express'
import { validate } from '@middleware/validate'
import { getBasicExpenseForPeriodSchema } from '@validators/statistics'
import { statisticsController } from '@controllers'

const router = Router()

router.get(
  '/basic',
  validate(getBasicExpenseForPeriodSchema),
  statisticsController.getBasicExpenseForPeriod,
)

export default router

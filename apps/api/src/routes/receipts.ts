import { Router } from 'express'
import { createReceiptSchema } from '@validators/receipts'
import { validate } from '@middleware/validate'
import { receiptsController } from '@controllers'
import { getPaginationSchema } from '@validators/pagination'

const router = Router()

router.get('/', validate(getPaginationSchema), receiptsController.getAll)
router.post('/', validate(createReceiptSchema), receiptsController.create)

export default router

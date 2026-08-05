import { Router } from 'express'
import { createReceiptSchema } from '@validators/receipts'
import { validate } from '@middleware/validate'
import { receiptsController } from '@controllers'

const router = Router()

router.get('/', receiptsController.getAll)
router.post('/', validate(createReceiptSchema), receiptsController.create)

export default router

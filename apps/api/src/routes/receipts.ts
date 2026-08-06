import { Router } from 'express'
import { createReceiptSchema, deleteReceiptSchema } from '@validators/receipts'
import { validate } from '@middleware/validate'
import { receiptsController } from '@controllers'
import { getPaginationSchema } from '@validators/pagination'

const router = Router()

router.get('/', validate(getPaginationSchema), receiptsController.getAll)
router.post('/', validate(createReceiptSchema), receiptsController.create)
router.delete('/:id', validate(deleteReceiptSchema), receiptsController.remove)

export default router

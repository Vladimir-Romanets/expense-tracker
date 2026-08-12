import { Router } from 'express'
import { createReceiptSchema, paramsIdReceiptSchema } from '@validators/receipts'
import { validate } from '@middleware/validate'
import { receiptsController } from '@controllers'
import { getPaginationSchema } from '@validators/pagination'

const router = Router()

router.get('/', validate(getPaginationSchema), receiptsController.getAll)
router.get('/:id', validate(paramsIdReceiptSchema), receiptsController.getById)
router.post('/', validate(createReceiptSchema), receiptsController.create)
router.delete('/:id', validate(paramsIdReceiptSchema), receiptsController.remove)

export default router

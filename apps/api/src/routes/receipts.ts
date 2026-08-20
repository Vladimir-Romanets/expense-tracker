import { Router } from 'express'
import {
  createReceiptSchema,
  paramsIdReceiptSchema,
  updateReceiptSchema,
  getReceiptsFilterSchema,
} from '@validators/receipts'
import { validate } from '@middleware/validate'
import { receiptsController } from '@controllers'
import { fileUpload } from '@helpers/fileUpload/fileUpload'

const router = Router()

router.get('/', validate(getReceiptsFilterSchema), receiptsController.getAll)
router.get('/:id', validate(paramsIdReceiptSchema), receiptsController.getById)
router.post('/', validate(createReceiptSchema), receiptsController.create)
router.post('/parse', fileUpload.single('receiptScreenshot'), receiptsController.parse)
router.put('/:id', validate(updateReceiptSchema), receiptsController.update)
router.delete('/:id', validate(paramsIdReceiptSchema), receiptsController.remove)

export default router

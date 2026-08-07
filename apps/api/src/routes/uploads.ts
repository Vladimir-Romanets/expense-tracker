import { Router } from 'express'
import { uploadController } from '@controllers'
import { validate } from '@middleware/validate'
import { presignedUploadSchema } from '@validators/uploads'

const router = Router()

router.post('/presigned-url', validate(presignedUploadSchema), uploadController.uploadFile)

export default router

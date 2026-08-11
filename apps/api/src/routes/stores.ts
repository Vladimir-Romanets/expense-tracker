import express from 'express'
import { storesController } from '@controllers'
import { createStoreSchema } from '@validators/stores'
import { getPaginationSchema } from '@validators/pagination'
import { validate } from '@middleware/validate'

const router = express.Router()

router.post('/', validate(createStoreSchema), storesController.create)
router.get('/', validate(getPaginationSchema), storesController.getAll)

export default router

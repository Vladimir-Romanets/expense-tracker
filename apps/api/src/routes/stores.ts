import express from 'express'
import { storesController } from '@controllers'
import { createStoreSchema } from '@validators/stores'
import { validate } from '@middleware/validate'

const router = express.Router()

router.post('/', validate(createStoreSchema), storesController.create)
router.get('/', storesController.getAllStores)

export default router

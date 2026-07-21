import express from 'express'
import { usersController } from '@controllers'

import { validate } from '@middleware/validate'
import { createUserSchema } from '@validators/users'

const router = express.Router()
router.post('/', validate(createUserSchema), usersController.create)

export default router

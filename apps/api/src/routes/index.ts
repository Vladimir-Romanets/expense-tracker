import express from 'express'

import { validate } from '@middleware/validate'
import { authenticate } from '@middleware/authenticate'
import { registerUserSchema, loginUserSchema } from '@validators/auth'
import { authController } from '@controllers'
import storesRouter from './stores'
import categoriesRouter from './categories'

const router = express.Router()

router.post('/register', validate(registerUserSchema), authController.register)
router.post('/login', validate(loginUserSchema), authController.login)

router.use(authenticate)
router.use('/stores', storesRouter)
router.use('/categories', categoriesRouter)

export default router

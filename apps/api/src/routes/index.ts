import express from 'express'

import { validate } from '@middleware/validate'
import { authenticate } from '@middleware/authenticate'
import { registerUserSchema, loginUserSchema } from '@validators/auth'
import { authController } from '@controllers'
import storesRouter from './stores'
import categoriesRouter from './categories'
import receiptsRouter from './receipts'
import productsRouter from './products'

const router = express.Router()

router.post('/register', validate(registerUserSchema), authController.register)
router.post('/login', validate(loginUserSchema), authController.login)

router.use(authenticate)
router.use('/stores', storesRouter)
router.use('/categories', categoriesRouter)
router.use('/receipts', receiptsRouter)
router.use('/products', productsRouter)

router.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.originalUrl,
  })
})

export default router

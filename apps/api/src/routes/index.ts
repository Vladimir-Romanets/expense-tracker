import express from 'express'

import { validate } from '@middleware/validate'
import { authenticate } from '@middleware/authenticate'
import { loginLimiter, registerLimiter, uploadLimiter } from '@middleware/rateLimiter'
import { registerUserSchema, loginUserSchema } from '@validators/auth'
import { authController } from '@controllers'
import storesRouter from './stores'
import categoriesRouter from './categories'
import receiptsRouter from './receipts'
import productsRouter from './products'
import statisticsRouter from './statistics'
import uploadFileRoute from './uploads'

const router = express.Router()

// Public routes (no auth required)
router.post('/register', registerLimiter, validate(registerUserSchema), authController.register)
router.post('/login', loginLimiter, validate(loginUserSchema), authController.login)
router.post('/logout', authController.logout) // Intentionally public — clears cookie even for invalid/expired sessions

// Protected routes
router.use(authenticate)
router.use('/stores', storesRouter)
router.use('/categories', categoriesRouter)
router.use('/receipts', receiptsRouter)
router.use('/products', productsRouter)
router.use('/statistics', statisticsRouter)
router.use('/uploads', uploadLimiter, uploadFileRoute)

router.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.originalUrl,
  })
})

export default router

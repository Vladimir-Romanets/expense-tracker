import express, { Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import routes from '@routes'
import { globalErrorHandler } from '@middleware/errorHandler'

dotenv.config()

const app = express()
app.set('trust proxy', 1)
const PORT = process.env.PORT || 3001
const corsOrigin = process.env.CORS_ORIGIN

if (!corsOrigin) throw new Error('CORS_ORIGIN env variable is required')

app.use(cors({ origin: corsOrigin, credentials: true }))
app.use(express.json())
app.use(cookieParser())

// Apply global rate limiter to all API routes
app.use(globalErrorHandler)
app.get('/health', (_, res: Response) => {
  res.json({ status: 'ok', message: 'API is running' })
})
app.use('/api', routes)

app.listen(PORT, () => {
  /* eslint-disable-next-line no-console */
  console.log(`Server is running on http://localhost:${PORT}`)
})

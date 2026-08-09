import express, { Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import routes from '@routes'
import { globalErrorHandler } from '@middleware/errorHandler'
import { globalLimiter } from '@middleware/rateLimiter'

dotenv.config()

const app = express()
app.set('trust proxy', 1)

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"],
      },
    },
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
)

const PORT = process.env.PORT || 3001
const corsOrigin = process.env.CORS_ORIGIN

if (!corsOrigin) throw new Error('CORS_ORIGIN env variable is required')

app.use(cors({ origin: corsOrigin, credentials: true }))
app.use(express.json())
app.use(cookieParser())

// Apply global rate limiter to all API routes
app.use(globalLimiter)
app.get('/health', (_, res: Response) => {
  res.json({ status: 'ok', message: 'API is running' })
})
app.use('/api', routes)

app.use(globalErrorHandler)

app.listen(PORT, () => {
  /* eslint-disable-next-line no-console */
  console.log(`Server is running on http://localhost:${PORT}`)
})

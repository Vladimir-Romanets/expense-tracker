import express, { Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import routes from '@routes'
import { globalErrorHandler } from '@middleware/errorHandler'
import { globalLimiter } from '@middleware/rateLimiter'
import { config } from '@config'

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

app.use(cors({ origin: config.corsOrigin, credentials: true }))
app.use(express.json())
app.use(cookieParser())

// Apply global rate limiter to all API routes
app.use(globalLimiter)
app.get('/health', (_, res: Response) => {
  res.json({ status: 'ok', message: 'API is running' })
})
app.use('/api', routes)

app.use(globalErrorHandler)

app.listen(config.port, () => {
  /* eslint-disable-next-line no-console */
  console.log(`Server is running on http://localhost:${config.port}`)
})

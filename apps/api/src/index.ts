import express, { Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from '@routes'
import { globalErrorHandler } from '@middleware/errorHandler'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/api/health', (_, res: Response) => {
  res.json({ status: 'ok', message: 'API is running' })
})
app.use('/api', routes)

app.use(globalErrorHandler)

app.listen(PORT, () => {
  /* eslint-disable-next-line no-console */
  console.log(`Server is running on http://localhost:${PORT}`)
})

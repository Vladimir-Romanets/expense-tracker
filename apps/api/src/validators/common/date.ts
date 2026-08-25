import { z } from 'zod'

export const date = z.coerce
  .date({
    error: 'Date is incorrect or not set',
  })
  .transform((d) => d.toISOString())

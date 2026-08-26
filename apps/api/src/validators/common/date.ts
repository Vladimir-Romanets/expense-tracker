import { z } from 'zod'

export const dateOnly = z
  .string('Date is incorrect or not set')
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
  .refine(
    (val) => {
      const date = new Date(val)
      return !isNaN(date.getTime()) && date.toISOString().startsWith(val)
    },
    {
      message: 'Date is incorrect or not set',
    },
  )

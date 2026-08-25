import { z } from 'zod'
import { date } from './common/date'

const _basicExpenseSchema = z
  .object({
    startDate: date,
    endDate: date,
  })
  .refine((v) => new Date(v.startDate) <= new Date(v.endDate), {
    error: 'startDate must be before or equal to endDate',
    path: ['endDate'],
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate)
      const end = new Date(data.endDate)
      const maxEnd = new Date(start)
      maxEnd.setFullYear(maxEnd.getFullYear() + 1)
      return end <= maxEnd
    },
    {
      error: 'The range can not be more then a year',
      path: ['endDate'],
    },
  )

export const getBasicExpenseForPeriodSchema = z.object({
  query: _basicExpenseSchema,
})

export type BasicExpenseForPeriodQuery = z.infer<typeof getBasicExpenseForPeriodSchema>
export type BasicExpenseForPeriodProps = z.infer<typeof _basicExpenseSchema>

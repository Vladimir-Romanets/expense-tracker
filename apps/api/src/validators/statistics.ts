import { z } from 'zod'
import { dateOnly } from './common/date'

const _periodFilterSchema = z
  .object({
    startDate: dateOnly,
    endDate: dateOnly,
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

export const periodFilterQuerySchema = z.object({
  query: _periodFilterSchema,
})

export type PeriodFilterPropsQuery = z.infer<typeof periodFilterQuerySchema>
export type PeriodFilterProps = z.infer<typeof _periodFilterSchema>

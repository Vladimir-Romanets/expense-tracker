import { z } from 'zod'

export const dateRangeSchema = z
  .object({
    startDate: z.string(),
    endDate: z.string(),
  })
  .superRefine((data, ctx) => {
    const isRangeSelected = Boolean(data.startDate && data.endDate)
    if (!isRangeSelected) {
      ctx.addIssue({ code: 'custom', path: ['endDate'], message: '' })
      return
    }
    if (new Date(data.startDate) > new Date(data.endDate)) {
      ctx.addIssue({
        code: 'custom',
        path: ['endDate'],
        message: 'Start date must be before or equal to end date',
      })
    }
  })

export type DateRangeFilterValues = z.infer<typeof dateRangeSchema>

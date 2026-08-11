import { z } from 'zod'

const optionalCoerceNumber = z.preprocess((val) => {
  if (val === '' || val === undefined || val === null) return undefined
  const num = Number(val)
  return isNaN(num) ? undefined : num
}, z.number().int().nonnegative().optional())

export const getPaginationSchema = z.object({
  query: z.object({
    page: optionalCoerceNumber,
    limit: optionalCoerceNumber,
  }),
})

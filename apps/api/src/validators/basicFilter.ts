import { z } from 'zod'

export const optionalCoerceNumber = z.preprocess((val) => {
  if (val === '' || val === undefined || val === null) return undefined
  const num = Number(val)
  return isNaN(num) ? undefined : num
}, z.number().int().nonnegative().optional())

export const optionalCoerceString = z.preprocess((val) => {
  if (val === '' || val === undefined || val === null) return undefined
  return val
}, z.string().optional())

export const optionalCoerceSortOrder = z.preprocess(
  (val) => (val === null || val === '' ? undefined : val),
  z.enum(['asc', 'desc']).optional().default('desc'),
)

export const basicQuerySchema = z.object({
  page: optionalCoerceNumber,
  limit: optionalCoerceNumber,
  sortBy: optionalCoerceString,
  sortOrder: optionalCoerceSortOrder,
  search: optionalCoerceString,
})

export const getBasicFilterSchema = z.object({
  query: basicQuerySchema,
})

export type BasicFilter = z.infer<typeof getBasicFilterSchema>
export type BasicQuery = z.infer<typeof basicQuerySchema>

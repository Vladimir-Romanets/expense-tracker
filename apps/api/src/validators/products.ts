import { z } from 'zod'
import { basicQuerySchema, optionalCoerceNumber } from './basicFilter'

const productQuerySchema = basicQuerySchema.extend({
  categoryId: optionalCoerceNumber,
})

export const getProductFilterSchema = z.object({
  query: productQuerySchema,
})

export const updateProductSchema = z.object({
  params: z.object({
    id: z.coerce.number().positive(),
  }),
  body: z.object({
    name: z.string().trim().min(1).max(100),
    categoryId: z.number().int().positive().nullable().optional(),
  }),
})

export type ProductFilter = z.infer<typeof getProductFilterSchema>
export type ProductQuery = z.infer<typeof productQuerySchema>
export type UpdateProductDto = z.infer<typeof updateProductSchema>

import { z } from 'zod'
import { basicQuerySchema, optionalCoerceNumber } from './basicFilter'

const updateCategorySchema = z.object({
  productIds: z
    .array(z.number().int().positive())
    .min(1, 'At least one item must be provided for update.'),
  categoryId: z.number().int().positive().nullable(),
})

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

export const productQueryBulkCategoryUpdate = z.object({
  body: updateCategorySchema,
})

export type ProductFilter = z.infer<typeof getProductFilterSchema>
export type ProductQuery = z.infer<typeof productQuerySchema>
export type ProductQueryBulkCategoryUpdate = z.infer<typeof productQueryBulkCategoryUpdate>
export type UpdateProductDto = z.infer<typeof updateProductSchema>
export type BulkUpdateCategoryForProductDto = z.infer<typeof updateCategorySchema>

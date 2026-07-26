import { z } from 'zod'

export const updateProductSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  categoryId: z.number().int().positive().nullable().optional(),
})

export type UpdateProductDto = z.infer<typeof updateProductSchema>

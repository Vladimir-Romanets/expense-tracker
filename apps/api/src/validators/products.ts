import { z } from 'zod'

export const updateProductSchema = z.object({
  params: z.object({
    id: z.coerce.number().positive(),
  }),
  body: z.object({
    name: z.string().trim().min(1).max(100),
    categoryId: z.number().int().positive().nullable().optional(),
  }),
})
export type UpdateProductDto = z.infer<typeof updateProductSchema>

import { z } from 'zod'

export const addCategorySchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
})

export type AddCategoryFormValues = z.infer<typeof addCategorySchema>

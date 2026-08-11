import { z } from 'zod'

export const addCategorySchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().max(255).optional(),
  image: z
    .custom<File>((v) => typeof window !== 'undefined' && v instanceof File)
    .optional()
    .refine(
      (file) => !file || file.size <= 1 * 1024 * 1024,
      'Image size must be less than 1MB'
    ),
})

export type AddCategoryFormValues = z.infer<typeof addCategorySchema>

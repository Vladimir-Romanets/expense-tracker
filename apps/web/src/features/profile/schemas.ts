import { z } from 'zod'

export const updateProfileSchema = z.object({
  avatar: z
    .union([
      z.custom<File>((v) => typeof window !== 'undefined' && v instanceof File),
      z.string(),
    ])
    .optional()
    .refine(
      (file) => !(file instanceof File) || file.size <= 5 * 1024 * 1024,
      'Image size must be less than 5MB'
    ),
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.email('Enter a valid email address'),
})

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>

import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email({ message: 'Email is not correct' }),
  password: z.string().min(8, 'Password must be at least 8 characters!'),
})

export type LoginSchemaProps = z.infer<typeof loginSchema>

import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type LoginSchemaProps = z.infer<typeof loginSchema>

export const registrationSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    repeatPassword: z.string().min(8, 'Password must be at least 8 characters'),
  })
  .superRefine(({ password, repeatPassword }, ctx) => {
    if (password !== repeatPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['repeatPassword'],
      })
    }
  })

export type RegistrationSchemaProps = z.infer<typeof registrationSchema>

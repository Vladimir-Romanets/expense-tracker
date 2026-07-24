import { z } from 'zod'

export const registerUserSchema = z.object({
  firstName: z.string().max(50).optional(),
  lastName: z.string().max(50).optional(),
  email: z.email().max(100),
  password: z.string().min(8).max(255),
})

export const loginUserSchema = z.object({
  email: z.email().max(100),
  password: z.string().min(8).max(255),
})

export type RegisterUserDto = z.infer<typeof registerUserSchema>
export type LoginUserDto = z.infer<typeof loginUserSchema>

import { z } from 'zod'

const _registerUserBodySchema = z.object({
  firstName: z.string().max(50).optional(),
  lastName: z.string().max(50).optional(),
  email: z.email().max(100),
  password: z.string().min(8).max(255),
})

const _loginUserBodySchema = z.object({
  email: z.email().max(100),
  password: z.string().min(8).max(255),
})

export const registerUserSchema = z.object({ body: _registerUserBodySchema })
export const loginUserSchema = z.object({ body: _loginUserBodySchema })

export type RegisterUserDto = z.infer<typeof _registerUserBodySchema>
export type LoginUserDto = z.infer<typeof _loginUserBodySchema>

'use server'

import { type RegistrationSchemaProps } from '../schemas/auth'
import { apiClient, prettierError } from '@/lib/apiClient'
import { login } from '@/utils/login'
import type { User } from '@/stores/user'

type RegisterSucceedProps = {
  user: User
  token: string
}

export type RegisterActionState = {
  success?: boolean
  user?: User
  errors?: Record<keyof RegistrationSchemaProps, string>
  formError?: string
}

export const registrationAction = async (
  data: RegistrationSchemaProps
): Promise<RegisterActionState> => {
  try {
    const { token, user } = await apiClient<RegisterSucceedProps>('/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    await login(token)
    
    return { success: true, user }
  } catch (error) {
    return prettierError(error)
  }
}

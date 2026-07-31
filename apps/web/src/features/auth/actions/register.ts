'use server'

import { redirect } from 'next/navigation'
import { type RegistrationSchemaProps } from '../schemas/auth'
import { apiClient, prettierError } from '@/lib/apiClient'
import { login } from '@/utils/login'

type RegisterSucceedProps = {
  user: unknown
  token: string
}

export type RegisterActionState = {
  success?: boolean
  errors?: Record<keyof RegistrationSchemaProps, string>
  formError?: string
}

export const registrationAction = async (
  data: RegistrationSchemaProps
): Promise<RegisterActionState> => {
  try {
    const { token } = await apiClient<RegisterSucceedProps>('/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    await login(token)
  } catch (error) {
    return prettierError(error)
  }

  redirect('/overview')
}

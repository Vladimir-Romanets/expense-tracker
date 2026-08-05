'use server'

import { type RegistrationSchemaProps } from '../schemas/auth'
import { apiClientWithHeaders, prettierError } from '@/lib/apiClient'
import { login } from '@/utils/login'
import type { User } from '@/stores/user'

type RegisterSucceedProps = {
  user: User
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
    const response = await apiClientWithHeaders('/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    const { user } = (await response.json()) as RegisterSucceedProps

    const setCookieHeaders = response.headers.getSetCookie()

    await login(setCookieHeaders)

    return { success: true, user }
  } catch (error) {
    return prettierError(error)
  }
}

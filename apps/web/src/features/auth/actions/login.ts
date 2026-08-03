'use server'

import { loginSchema, type LoginSchemaProps } from '../schemas/auth'
import { flattenFieldErrors } from '@/utils/format-error'
import { apiClient } from '@/lib/apiClient'
import { login } from '@/utils/login'
import type { User } from '@/stores/user'

type LoginSucceedProps = {
  user: User
  token: string
}

export type LoginActionState = {
  success?: boolean
  user?: User
  errors?: {
    email?: string
    password?: string
    formError?: string
  }
  values: Partial<LoginSchemaProps>
}

export const loginAction = async (
  _: LoginActionState,
  formData: FormData
): Promise<LoginActionState> => {
  const formValues = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const validated = loginSchema.safeParse(formValues)

  if (!validated.success) {
    return {
      errors: flattenFieldErrors(validated.error),
      values: formValues,
    }
  }

  try {
    const { token, user } = await apiClient<LoginSucceedProps>('/login', {
      method: 'POST',
      body: JSON.stringify(validated.data),
    })

    await login(token)

    return {
      success: true,
      user,
      values: formValues,
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'

    return {
      errors: { formError: errorMessage },
      values: formValues,
    }
  }
}

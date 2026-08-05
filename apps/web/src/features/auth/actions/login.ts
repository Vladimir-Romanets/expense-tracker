'use server'

import { loginSchema, type LoginSchemaProps } from '../schemas/auth'
import { flattenFieldErrors } from '@/utils/format-error'
import { apiClientWithHeaders, prettierError } from '@/lib/apiClient'
import { login } from '@/utils/login'
import type { User } from '@/stores/user'

type LoginSucceedProps = {
  user: User
}

export type LoginActionState = {
  success?: boolean
  user?: User
  errors?: {
    email?: string
    password?: string
  }
  formError?: string
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
    const response = await apiClientWithHeaders('/login', {
      method: 'POST',
      body: JSON.stringify(validated.data),
    })

    const { user } = (await response.json()) as LoginSucceedProps

    const setCookieHeaders = response.headers.getSetCookie()

    await login(setCookieHeaders)

    return {
      success: true,
      user,
      values: formValues,
    }
  } catch (error) {
    return {
      ...prettierError(error),
      values: formValues,
    }
  }
}

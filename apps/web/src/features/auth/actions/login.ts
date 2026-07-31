'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { loginSchema, type LoginSchemaProps } from '../schemas/auth'
import { flattenFieldErrors } from '@/utils/format-error'
import { apiClient } from '@/lib/apiClient'

type LoginSucceedProps = {
  user: unknown
  token: string
}

export type LoginActionState = {
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
    const { token } = await apiClient<LoginSucceedProps>('/login', {
      method: 'POST',
      body: JSON.stringify(validated.data),
    })

    const cookieStore = await cookies()
    cookieStore.set('session', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    })
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'

    return {
      errors: { formError: errorMessage },
      values: formValues,
    }
  }

  redirect('/dashboard')
}

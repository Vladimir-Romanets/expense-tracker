'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { loginSchema, type LoginSchemaProps } from '@/lib/validators/auth'
import { flattenFieldErrors } from '../../lib/validators/format-error'

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

  const res = await fetch(`${process.env.API_URL}/api/login`, {
    method: 'POST',
    body: JSON.stringify(validated.data),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    return {
      errors: { formError: 'Login or password incorrect' },
      values: formValues,
    }
  }

  const { token } = await res.json()
  const cookieStore = await cookies()
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })

  redirect('/dashboard')
}

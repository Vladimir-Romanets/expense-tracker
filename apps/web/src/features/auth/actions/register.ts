'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { type RegistrationSchemaProps } from '../schemas/auth'
import { apiClient, prettierError } from '@/lib/apiClient'

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

    const cookieStore = await cookies()
    cookieStore.set('session', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    })
  } catch (error) {
    return prettierError(error)
  }

  redirect('/dashboard')
}

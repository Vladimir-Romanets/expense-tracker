'use server'

import { redirect } from 'next/navigation'
import { type RegistrationSchemaProps } from '@/lib/validators/auth'
import { apiClient, prettierError } from '@/lib/apiClient'

export type RegisterActionState = {
  success?: boolean
  errors?: Record<keyof RegistrationSchemaProps, string>
  formError?: string
}

export const registrationAction = async (
  data: RegistrationSchemaProps
): Promise<RegisterActionState | undefined> => {
  let registerError: RegisterActionState | null = null
  try {
    await apiClient('/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  } catch (error) {
    registerError = prettierError(error)
    return registerError
  }
  if (!registerError) redirect('/dashboard')
}

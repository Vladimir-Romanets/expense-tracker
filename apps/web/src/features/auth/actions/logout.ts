'use server'

import { cookies } from 'next/headers'
import { serverApiClient } from '@/lib/apiClient.server'
import { AUTH_COOKIE_NAME } from '@/constants/cookie'

export const logoutAction = async () => {
  try {
    await serverApiClient('/logout', { method: 'POST' })
  } catch (error) {
    console.error('Logout API failed:', error)
  }

  const cookieStore = await cookies()
  cookieStore.delete(AUTH_COOKIE_NAME)
}

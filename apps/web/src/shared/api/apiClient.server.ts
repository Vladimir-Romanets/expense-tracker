import { cookies } from 'next/headers'
import { apiClient, type FetchOptions } from './apiClient'
import { AUTH_COOKIE_NAME } from '@/shared/config/cookie'

export async function serverApiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value

  const headers = new Headers(options.headers)
  if (token) {
    headers.set('Cookie', `${AUTH_COOKIE_NAME}=${token}`)
  }

  return apiClient<T>(endpoint, { ...options, headers })
}

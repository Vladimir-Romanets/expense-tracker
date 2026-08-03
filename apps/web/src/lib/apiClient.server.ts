import { cookies } from 'next/headers'
import { apiClient, type FetchOptions } from './apiClient'
import { SESSION_COOKIE_NAME } from '@/constants/sessionCookie'

export async function serverApiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const cookieStore = await cookies()

  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value

  return apiClient<T>(endpoint, { ...options, token })
}

import 'server-only'
import { cookies } from 'next/headers'
import { AUTH_COOKIE_NAME } from '@/constants/cookie'
import { validateToken } from './token'

export const checkAuthenticated = async (): Promise<boolean> => {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value

  return token ? validateToken(token) : false
}

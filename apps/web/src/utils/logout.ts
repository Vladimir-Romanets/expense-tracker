import 'server-only'

import { cookies } from 'next/headers'
import { SESSION_COOKIE_NAME } from '@/constants/sessionCookie'

export const logout = async () => {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

import 'server-only'

import { SESSION_COOKIE_NAME } from '@/constants/sessionCookie'
import { cookies } from 'next/headers'

export const login = async (token: string) => {
  const cookieStore = await cookies()

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 3600 * 24,
  })
}

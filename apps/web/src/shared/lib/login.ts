import 'server-only'
import { cookies } from 'next/headers'
import { AUTH_COOKIE_NAME } from '@/shared/config/cookie'

export const login = async (setCookieHeader: string[]) => {
  const raw = setCookieHeader.find((h) => h.startsWith(`${AUTH_COOKIE_NAME}=`))

  if (!raw) {
    throw new Error(
      'Authentication failed: token cookie missing in server response'
    )
  }

  const value = raw.split(';')[0].slice(`${AUTH_COOKIE_NAME}=`.length)
  const cookieStore = await cookies()

  cookieStore.set(AUTH_COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 3600 * 24, // Matches backend max-age roughly, or we could parse it
  })
}

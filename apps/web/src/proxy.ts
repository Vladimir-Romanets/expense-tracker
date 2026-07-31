import { NextResponse, type NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import { SESSION_COOKIE_NAME } from '@/constants/sessionCookie'
import { logout } from '@/utils/logout'

if (!process.env.JWT_SECRET) {
  throw new Error('[proxy] JWT_SECRET environment variable is not set')
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

interface JwtPayload {
  userId: number
}

const redirectToLogin = async (request: NextRequest) => {
  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('from', request.nextUrl.pathname)
  const response = NextResponse.redirect(loginUrl)

  await logout()

  return response
}

export default async function proxy(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value

  if (token) {
    try {
      await jwtVerify<JwtPayload>(token, secret, {
        algorithms: ['HS256'],
      })
      return NextResponse.next()
    } catch (_) {
      // TODO: Token revalidation will be added in the future
      return await redirectToLogin(request)
    }
  }

  return await redirectToLogin(request)
}

export const config = {
  matcher: [
    '/overview/:path*',
    '/receipts/:path*',
    '/categories/:path*',
    '/profile',
  ],
}

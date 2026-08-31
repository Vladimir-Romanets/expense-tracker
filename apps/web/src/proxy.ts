import { NextRequest, NextResponse } from 'next/server'
import { AUTH_COOKIE_NAME } from './shared/config/cookie'
import { validateToken } from './shared/lib/token'

const AUTH_PATHS = ['/login', '/register', '/forgot-password']
const DEFAULT_REDIRECT_AFTER_LOGIN = '/overview'

const checkIsAuthPath = (pathname: string): boolean =>
  AUTH_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  )

const redirectToLogin = (request: NextRequest) => {
  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('from', request.nextUrl.pathname)
  const response = NextResponse.redirect(loginUrl)

  response.cookies.delete(AUTH_COOKIE_NAME)

  return response
}

const redirectAuthenticatedUser = (request: NextRequest) => {
  const url = new URL(DEFAULT_REDIRECT_AFTER_LOGIN, request.url)
  return NextResponse.redirect(url)
}

export default async function proxy(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value
  const isTokenValid = token ? await validateToken(token) : false
  const isAuthPath = checkIsAuthPath(request.nextUrl.pathname)

  if (request.nextUrl.pathname === '/') {
    return NextResponse.next()
  }

  if (isTokenValid) {
    if (isAuthPath) {
      return redirectAuthenticatedUser(request)
    }

    return NextResponse.next()
  }

  if (isAuthPath) {
    if (token) {
      const response = NextResponse.next()
      response.cookies.delete(AUTH_COOKIE_NAME)
      return response
    }

    return NextResponse.next()
  }

  // TODO: Token revalidation will be added in the future
  return redirectToLogin(request)
}

export const config = {
  matcher: [
    '/overview/:path*',
    '/receipts/:path*',
    '/categories/:path*',
    '/profile',
    '/login',
    '/register',
    '/forgot-password',
    '/((?!api|_next/static|_next/image|favicon\\.ico|manifest\\.webmanifest|manifest\\.json|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2)$).*)',
  ],
}

import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify, errors as joseErrors } from 'jose'
import { AUTH_COOKIE_NAME } from './constants/cookie'

interface JwtPayload {
  userId: number
}

if (!process.env.JWT_SECRET) {
  throw new Error('[proxy] JWT_SECRET environment variable is not set')
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET)
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

const validateToken = async (token: string) => {
  try {
    await jwtVerify<JwtPayload>(token, secret, {
      algorithms: ['HS256'],
    })
    return true
  } catch (err) {
    if (
      err instanceof joseErrors.JWTExpired ||
      err instanceof joseErrors.JWTInvalid ||
      err instanceof joseErrors.JWSSignatureVerificationFailed
    ) {
      return false
    }
    throw err
  }
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

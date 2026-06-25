import { NextRequest, NextResponse } from 'next/server'

const SESSION_COOKIE = 'better-auth.session_token'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  // Check for better-auth session cookie.
  // The layout does the real cryptographic validation — this is just a fast redirect
  // to avoid unnecessary round-trips when clearly logged out.
  const sessionCookie = request.cookies.get(SESSION_COOKIE)

  if (!sessionCookie?.value) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

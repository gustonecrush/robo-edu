import { NextResponse } from 'next/server'

export function middleware(request: any) {
  const token = request.cookies.get('Token')

  if (!token) {
    const protectedPaths = ['/dashboard/contributor', '/courses', '/home']

    if (protectedPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
}

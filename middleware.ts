import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(function middleware(request: NextRequestWithAuth) {
  if (
    request.nextUrl.pathname.startsWith('/patient') &&
    request.nextauth.token?.extension_UserRole !== 'patient'
  ) {
    return NextResponse.rewrite(new URL('/error', request.url));
  }

  if (
    request.nextUrl.pathname.startsWith('/practitioner') &&
    request.nextauth.token?.extension_UserRole !== 'practitioner'
  ) {
    return NextResponse.rewrite(new URL('/error', request.url));
  }
});

/* export { default } from 'next-auth/middleware';

export const config = { matcher: ['/patient',] }; */

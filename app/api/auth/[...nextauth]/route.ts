import NextAuth from 'next-auth';
import { authOptions } from '@/lib/utils/authOptions';
import { NextResponse, NextRequest } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { redirect } from 'next/navigation';

const handler = (request: NextRequest, response: NextResponse) => {
  const b2cPasswordResetCancelErrorCode = 'AADB2C90091';
  const errorDescription =
    request.nextUrl.searchParams.get('error_description');

  if (
    errorDescription &&
    errorDescription.includes(b2cPasswordResetCancelErrorCode)
  ) {
    redirect('/');
  }

  return NextAuth(
    request as unknown as NextApiRequest,
    response as unknown as NextApiResponse,
    authOptions
  );
};

export { handler as GET, handler as POST };
//export const { handlers, auth } = NextAuth( authOptions);

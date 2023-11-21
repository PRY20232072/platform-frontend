import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface Session {
    user: {
      id: string | undefined;
      extension_PhoneNumber: string | undefined;
      extension_UserRole: string | undefined;
    } & DefaultSession['user'];
  }

  interface User {
    id: string | undefined;
    extension_PhoneNumber: string | undefined;
    extension_UserRole: string | undefined;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
    extension_PhoneNumber?: string;
    extension_UserRole?: string | undefined;
  }
}

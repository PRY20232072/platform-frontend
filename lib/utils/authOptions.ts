import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import AzureADB2CProvider from 'next-auth/providers/azure-ad-b2c';
import { AzureB2CProfile } from 'next-auth/providers/azure-ad-b2c';
import { NextApiRequest, NextApiResponse } from 'next';

if (
  !process.env.AZURE_AD_B2C_TENANT_NAME ||
  !process.env.AZURE_AD_B2C_CLIENT_ID ||
  !process.env.AZURE_AD_B2C_CLIENT_SECRET ||
  !process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW
) {
  console.error('Azure AD B2C fail！');
  process.exit();
}

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADB2CProvider({
      clientId: process.env.AZURE_AD_B2C_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_B2C_TENANT_NAME,
      primaryUserFlow: process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW,
      authorization: {
        params: {
          scope: `offline_access openid`,
          grant_type: 'authorization_code',
        },
      },
      checks: ['pkce'],

      profile(profile: AzureB2CProfile) {
        // console.log('THE PROFILE', profile);
        return {
          ...profile,
          id: profile.oid.toString(),
          email: profile.emails[0].toString(),
          extension_PhoneNumber: profile.extension_PhoneNumber ?? '123456789',
          extension_UserRole: profile.extension_UserRole ?? 'patient',
        };
      },
      client: {
        token_endpoint_auth_method: 'none',
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username:',
          type: 'text',
          placeholder: 'your-cool-username',
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: 'your-awesome-password',
        },
      },
      async authorize(credentials) {
        // This is where you need to retrieve user data
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        const user = {
          id: '42',
          name: 'Dave',
          password: 'nextauth',
          extension_PhoneNumber: '123456789',
          extension_UserRole: 'practitioner',
        };

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  cookies: {
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true,
      },
    },
  },
  pages: {},
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, user, account }) {
      // IMPORTANT: Persist the access_token to the token right after sign in
      if (user) {
        token.idToken = user.id;
        token.email = user.email;
        token.extension_PhoneNumber = user.extension_PhoneNumber;
        token.extension_UserRole = user.extension_UserRole;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session?.user) {
        session.user.id = token.sub;
        session.user.email = token.email;
        session.user.extension_PhoneNumber = token.extension_PhoneNumber;
        session.user.extension_UserRole = token.extension_UserRole;
      }
      return session;
    },
  },
};

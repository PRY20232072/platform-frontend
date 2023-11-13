import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import AzureADB2CProvider from 'next-auth/providers/azure-ad-b2c';
import { AzureB2CProfile } from 'next-auth/providers/azure-ad-b2c';

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
      idToken: true,
      profile(profile: AzureB2CProfile) {
        // console.log('THE PROFILE', profile);
        return {
          ...profile,
          id: profile.oid.toString(),
          email: profile.emails[0].toString(),
          /*  role: profile.extension_Role ?? 'user',*/
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
          role: 'manager',
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
  callbacks: {
    async jwt({ token, user }) {
      // IMPORTANT: Persist the access_token to the token right after sign in
      if (user) {
        token.idToken = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
        session.user.email = token.email;
      }
      return session;
    },
  },
};

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c";
import { AzureB2CProfile } from "next-auth/providers/azure-ad-b2c";
import NextAuth from "next-auth";

if (
  !process.env.AZURE_AD_B2C_TENANT_NAME ||
  !process.env.AZURE_AD_B2C_CLIENT_ID ||
  !process.env.AZURE_AD_B2C_CLIENT_SECRET ||
  !process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW
) {
  console.error("Azure AD B2C fail！");
  process.exit();
}
async function refreshAccessToken(token: any) {
  try {
    const url = `https://${process.env.AZURE_AD_B2C_TENANT_NAME}.b2clogin.com/${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW}/oauth2/v2.0/token`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: new URLSearchParams({
        client_id: process.env.AZURE_AD_B2C_CLIENT_ID || "",
        scope: `https://${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/api-pry2372/tasks.read https://${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/api-pry2372/tasks.write offline_access openid`,
        refresh_token: token.refreshToken,
        grant_type: "refresh_token",
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log("Error", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
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
          scope: `https://${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/api-pry2372/tasks.read https://${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/api-pry2372/tasks.write offline_access openid`,
          grant_type: "authorization_code",
        },
      },
      checks: ["pkce"],

      profile(profile: AzureB2CProfile) {
        return {
          ...profile,
          id: profile.sub.toString(),
          email: profile.emails[0].toString(),
          extension_PhoneNumber: profile.extension_PhoneNumber ?? "123456789",
          extension_UserRole: profile.extension_UserRole ?? "patient",
        };
      },
      client: {
        token_endpoint_auth_method: "none",
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  callbacks: {
    async signIn({ account }) {
      if (account?.provider !== "credentials") return true;
      return true;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    
    async jwt({ token, user, account, profile }) {
      // IMPORTANT: Persist the access_token to the token right after sign in

      if (account) {
        token.accessToken = account.access_token;
        token.idToken = profile?.sub;
        token.email = user.email;
        token.extension_PhoneNumber = user.extension_PhoneNumber;
        token.extension_UserRole = user.extension_UserRole;
        token.accessTokenExpires = account?.expires_at;
        token.refreshToken = account?.refresh_token;
      }

      if (Date.now() < (token.accessTokenExpires ?? 0) * 1000) {
        return token;
      }
      return await refreshAccessToken(token);
    },
    async session({ session, token, user }) {
      if (session?.user) {
        session.user.id = token.idToken;
        session.user.email = token.email;
        session.user.extension_PhoneNumber = token.extension_PhoneNumber;
        session.user.extension_UserRole = token.extension_UserRole;
        session.accessToken = token.accessToken as undefined;
        session.user.expires = token.accessTokenExpires; // Convert to string
      }

      return session;
    },
  },
  theme: {
    buttonText: "Iniciar sesión con Azure Active Directory B2C",
    logo: "https://vercel.pub/favicon.ico",
  },
  pages: {
    signIn: "/auth/login",
  },
};
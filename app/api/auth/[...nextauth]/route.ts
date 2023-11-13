// import NextAuth, { AuthOptions } from "next-auth";
import NextAuth from 'next-auth';
import { authOptions } from "@/lib/utils/authOptions"
import AzureADB2C from '@auth/core/providers/azure-ad-b2c';
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
//export const { handlers, auth } = NextAuth( authOptions);

import AuthProvider from '../context/AuthProvider';
import { authOptions } from '@/lib/utils/authOptions';
import { getServerSession } from 'next-auth/next';
import { redirect } from "next/navigation";
 


type User = {
    oid?: string | null | undefined;
   
} | undefined

type Props = {
    user: User,
    pagetype: string,
}
 
 

export default async function SetupLayout({
  children,  
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/sign-in");
   
  return (
    <>
        {children}
    </>
  );
}

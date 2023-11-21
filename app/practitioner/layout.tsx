import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/utils/authOptions';
import {redirect} from "next/navigation" 
export default async function PractitionerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
	redirect('/');
  }

  return (
    <section className="container mx-auto">
      <div className="">{children}</div>
    </section>
  );
}

import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/utils/authOptions';
import PatientHome from '@/components/patient/patient-home';
import PractitionerHome from '@/components/practitioner/practitioner-home';

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      {session ? (
        <div className="flex-col">
          <div className="flex flex-col  border-b border-gray-200 items-start gap-10 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-24 2xl:px-32 py-10 relative flex-[0_0_auto]">
            <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 z-10 font-bold text-4xl leading-12 relative mt-[-1.00px] tracking-[0]">
              Hi {session?.user?.name}
            </div>
          </div>
          {session.user?.extension_UserRole === 'patient' ? (
            <PatientHome />
          ) : (
            <PractitionerHome />
          )}
        </div>
      ) : (
        redirect('/sign-in')
      )}
    </>
  );
}

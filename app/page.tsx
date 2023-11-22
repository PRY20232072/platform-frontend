import NextLink from 'next/link';
import { Link } from '@nextui-org/link';
import { Snippet } from '@nextui-org/snippet';
import { Code } from '@nextui-org/code';
import { button as buttonStyles } from '@nextui-org/theme';
import { siteConfig } from '@/config/site';
import { title, subtitle } from '@/components/primitives';
import { GithubIcon } from '@/components/icons';
import { getServerSession } from 'next-auth/next';
import UserCard from '@/components/ui/user-card';
import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/card';

import { CardDemographic } from '@/components/ui/card-demographic';

import { useSession } from 'next-auth/react';
import { User, Users2, TestTube2, FileText } from 'lucide-react';

export default function Home() {
  const { data: session } = useSession();
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
            <>
              <div className="flex flex-col items-center gap-5 sm:gap-10 md:gap-14 lg:gap-20 xl:gap-24 2xl:gap-28 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-24 2xl:px-32 py-5 relative self-stretch w-full flex-[0_0_auto]">
                <CardDemographic />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-5 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-24 2xl:px-32 py-0 relative self-stretch w-full mb-6 flex-[0_0_auto]">
                <Card
                  link="/"
                  card_title="Family History"
                  icon={
                    <Users2
                      color="white"
                      className="w-5 h-[18px] left-[2px] top-[3px] absolute"
                    />
                  }
                  heading_one="Detail"
                  heading_two="Date"
                  cardData={[
                    { col1: 'Medical consultation', col2: '24/09/2023' },
                    { col1: 'Flu treatment', col2: '24/09/2023' },
                    { col1: 'Back pain', col2: '24/09/2023' },
                  ]}
                />
                <Card
                  link="patient/undefined/allergy-intolerance"
                  card_title="Allergies"
                  icon={
                    <TestTube2
                      color="white"
                      className="w-5 h-[18px] left-[2px] top-[3px] absolute"
                    />
                  }
                  heading_one="Detail"
                  heading_two="Date"
                  cardData={[
                    { col1: 'Allergic reaction', col2: '24/09/2023' },
                    { col1: 'Medical consultation', col2: '24/09/2023' },
                    { col1: 'Treatment', col2: '24/09/2023' },
                  ]}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-center gap-5 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-24 2xl:px-32 py-0 relative self-stretch w-full mt-6 mb-6 flex-[0_0_auto]">
                <Card
                  link="practitioner/undefined/patients"
                  card_title="Patients"
                  icon={
                    <User
                      color="white"
                      className="w-5 h-[18px] left-[2px] top-[3px] absolute"
                    />
                  }
                  heading_one="Name"
                  heading_two="ID"
                  cardData={[
                    { col1: 'Jhon Doe', col2: '18273645' },
                    { col1: 'Jhon Doe', col2: '18273645' },
                    { col1: 'Jhon Doe', col2: '18273645' },
                  ]}
                />
                <Card
                  link="practitioner/undefined/health-records"
                  card_title="Health Records"
                  icon={
                    <FileText
                      color="white"
                      className="w-4 h-5 left-[4px] top-[2px] absolute"
                    />
                  }
                  heading_one="Detail"
                  heading_two="Date"
                  cardData={[
                    { col1: 'Allergic reaction', col2: '24/09/2023' },
                    { col1: 'Consultation', col2: '24/09/2023' },
                    { col1: 'Treatment', col2: '24/09/2023' },
                  ]}
                />
              </div>
            </>
          )}
        </div>
      ) : (
        redirect('/sign-in')
      )}
    </>
  );
}

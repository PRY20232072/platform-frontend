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
import { authOptions } from '@/lib/utils/authOptions';
import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { CardFamilyHistory } from '@/components/ui/card-family-history';
import { CardDemographic } from '@/components/ui/card-demographic';

import { useSession } from 'next-auth/react';

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
          <div className="flex flex-col items-center gap-5 sm:gap-10 md:gap-14 lg:gap-20 xl:gap-24 2xl:gap-28 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-24 2xl:px-32 py-5 relative self-stretch w-full flex-[0_0_auto]">
            <CardDemographic />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5   px-4 sm:px-6 md:px-8 lg:px-20 xl:px-24 2xl:px-32 py-0 relative self-stretch w-full mb-6 flex-[0_0_auto]">
            <CardFamilyHistory />
            <Card />
          </div>
        </div>
      ) : (
        redirect('/sign-in')
      )}
    </>
  );
}

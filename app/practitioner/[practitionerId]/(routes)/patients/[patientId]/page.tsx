"use client";

import { Tabs, Tab, Card, CardBody, Button, Input } from '@nextui-org/react';

import { civilStatus, genders, addressTypes } from '@/data/data';
import { getServerSession } from 'next-auth/next';
import { CustomAutocomplete } from '@/components/ui/auto-complete';
import { User2, Pencil } from 'lucide-react';
import { PatientsClient } from './components/patients-client';
import { useSession } from 'next-auth/react';
export default function PatientPage() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col gap-5 px-4 py-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-32 items-stretch">
      <div className="justify-between items-center  border-b border-gray-200 flex w-full max-w-[1100px] gap-5 mt-1 max-md:max-w-full max-md:flex-wrap">
        <div className="flex grow basis-[0%] flex-col items-stretch my-auto max-md:max-w-full">
          <div className="text-4xl font-bold leading-10 max-md:max-w-full">
            Patient Details
          </div>
          <div className="justify-center text-neutral-400 text-2xl leading-10 max-md:max-w-full">
            Jhon Doe | jhondoe@plataform.com
          </div>
          <div className="justify-center text-neutral-400 text-base leading-10 max-md:max-w-full">
            ID: 81823182
          </div>
        </div>
        <div className="relative w-[116px] h-[115.5px]">
          <div className="w-24 h-24 px-1.5 py-1.5 left-0 top-[15.50px] absolute bg-blue-600 rounded-2xl justify-center items-center inline-flex">
            <User2
              className="w-12 h-12 px-2.5 py-1 flex-col justify-start items-center gap-0.5 inline-flex"
              color="white"
            />
          </div>
        </div>
      </div>
      <PatientsClient />
    </div>
  );
}

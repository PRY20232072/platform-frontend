"use client";

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/utils/authOptions';
import { PatientsSearch } from './components/patients-table';
import {
  practitionersTableColumns,
  practitionerTableColumns,
  practitioners,
  patientsTableColumns,
  patients,
} from '@/data/data';
import { useSession } from 'next-auth/react';
export default function PatientsPage() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col  items-center gap-5 px-4 py-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-32">
      <div className="justify-between items-center  border-b border-gray-200 flex w-full max-w-[1100px] gap-5 mt-1 max-md:max-w-full max-md:flex-wrap">
        <div className="flex grow basis-[0%] flex-col items-stretch my-auto max-md:max-w-full">
          <div className="mb-4 text-4xl font-bold leading-10 max-md:max-w-full">
            Patients
          </div>
        </div>
      </div>

      <PatientsSearch
        items={patients}
        columns={patientsTableColumns}
      />
    </div>
  );
}

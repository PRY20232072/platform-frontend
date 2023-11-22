"use client";

import React, { useEffect, useState } from 'react';

import { AllergyTable } from './components/allergy-table';
import { allergyTableColumns, patientAllergies } from '@/data/data';

import { useSession } from 'next-auth/react';

import allergyIntoleranceService from '@/services/allergyIntoleranceService';
import { useApi } from '@/hooks/useApi';

export default function AllergiesPage() {
  const {response, fetchData} = useApi();
  const { data: session } = useSession();

  useEffect(() => {
    fetchData(allergyIntoleranceService.getAllergyByPatientId(session?.user?.id));
  }, [session?.user?.id]);

  return (
    <div className="flex flex-col  items-start gap-5 px-4 py-4 md:px-8 lg:px-16 xl:px-20 2xl:px-32">
      <div className="justify-between items-center border-b border-gray-200 flex w-full max-w-[1100px] gap-5 mt-1 max-md:max-w-full max-md:flex-wrap">
        <div className="flex grow basis-[0%] flex-col items-stretch my-auto max-md:max-w-full">
          <div className="text-4xl font-bold leading-10 max-md:max-w-full">
            Allergy History
          </div>
          <div className="justify-center text-neutral-400 text-2xl leading-10 max-md:max-w-full">
            {session?.user?.name} | {session?.user?.email}
          </div>
          <div className="justify-center text-neutral-400 text-base leading-10 max-md:max-w-full">
            ID: {session?.user?.id}
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl mx-auto">
        <AllergyTable items={response?.data || []} columns={allergyTableColumns} />
      </div>
    </div>
  );
}

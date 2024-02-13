"use client";

import React, { useEffect, useState } from 'react';
import {
  emptyPatient,
} from '@/data/data';

import { useParams } from 'next/navigation';
import patientService from '@/services/patientService';
import { useApi } from '@/hooks/useApi';
import { FamilyRecordClient } from './components/family-record-client';

const SelectedFamilyRecordDetails = () => {
  const [patient, setPatient] = useState(emptyPatient);
  const { response: patientResponse, fetchData: getPatient } = useApi();
  const params = useParams();

  useEffect(() => {
    getPatient(patientService.getPatientById(params.patientId as string));
  }, [params.patientId]);

  useEffect(() => {
    if (patientResponse.isSuccess) {
      setPatient(patientResponse.data.data);
    }
  }, [patientResponse.isSuccess]);

  return (
    <div className="flex flex-col gap-5 px-4 py-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-32 items-stretch">
      <div className="justify-between items-center border-b border-gray-200 flex w-full max-w-[1100px] gap-5 mt-1 max-md:max-w-full max-md:flex-wrap">
        <div className="flex grow basis-[0%] flex-col items-stretch my-auto max-md:max-w-full">
          <div className="text-4xl font-bold leading-10 max-md:max-w-full">
            Family Record Details
          </div>
          <div className="justify-center text-neutral-400 text-2xl leading-10 max-md:max-w-full">
            {patient.name_id}
          </div>
          <div className="justify-center text-neutral-400 text-base leading-10 max-md:max-w-full">
            ID: {patient.patient_id}
          </div>
        </div>
      </div>
       <FamilyRecordClient /> 
    </div>
  );
};
export default SelectedFamilyRecordDetails;

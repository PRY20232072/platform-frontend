"use client";

import { emptyPatient } from '@/data/data';
import { PatientsClient } from './components/patients-client';
import { useParams } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import { useEffect, useState } from 'react';
import patientService from '@/services/patientService';
import PatientBasicInfo from './components/patient-basic-info';
import CustomSuspense from '@/components/custom-suspense';
import Loading from '@/components/loading';

export default function PatientPage() {
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
      <CustomSuspense isLoading={patientResponse.isLoading} fallback={<Loading />}>
        <PatientBasicInfo patient={patient} />
      </CustomSuspense>
      <CustomSuspense isLoading={patientResponse.isLoading} fallback={<Loading />}>
        <PatientsClient patient={patient} />
      </CustomSuspense>
    </div>
  );
}

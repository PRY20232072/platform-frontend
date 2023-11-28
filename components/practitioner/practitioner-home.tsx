"use client";

import { Card } from '@/components/ui/card';
import { useApi } from '@/hooks/useApi';
import allergyIntoleranceService from '@/services/allergyIntoleranceService';
import patientService from '@/services/patientService';
import { User, FileText } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import CustomSuspense from '../custom-suspense';
import CardSkeleton from '../ui/skeletons/card-skeleton';

export default function PractitionerHome() {
  const [allergyList, setAllergyList] = useState<any>([]);
  const [patientsList, setPatientsList] = useState<any>([]);
  const { response: patientsResponse, fetchData: getPatients } = useApi();
  const { response: allergyRecordsResponse, fetchData: getAllergyRecords } = useApi();
  const { data: session } = useSession();

  useEffect(() => {
    getPatients(patientService.getPatientList());
    getAllergyRecords(allergyIntoleranceService.getAllergyList());
  }, []);

  useEffect(() => {
    if (patientsResponse?.isSuccess) {
      setPatientsList(parsePatiensData());
    }
  }, [patientsResponse?.isSuccess]);

  useEffect(() => {
    if (allergyRecordsResponse?.isSuccess) {
      setAllergyList(parseAllergyData());
    }
  }, [allergyRecordsResponse?.isSuccess]);

  const parsePatiensData = () => {
    let patientsData: any[] = [];
    patientsResponse?.data?.map((patient: any) => {
      patientsData.push({
        col1: patient.name_id,
        col2: patient.patient_id,
      });
    });
    return patientsData;
  }

  const parseAllergyData = () => {
    let allergyData: any[] = [];
    allergyRecordsResponse?.data?.map((allergy: any) => {
      allergyData.push({
        col1: allergy.allergy_notes,
        col2: allergy.recorded_date,
      });
    });
    return allergyData;
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-5 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-24 2xl:px-32 py-0 relative self-stretch w-full mt-6 mb-6 flex-[0_0_auto]">
        <CustomSuspense isLoading={patientsResponse.isLoading} fallback={<CardSkeleton />}>
          <Card
            link={`practitioner/${session?.user?.id}/patients`}
            card_title="Patients"
            icon={
              <User
                color="white"
                className="w-5 h-[18px] left-[2px] top-[3px] absolute"
              />
            }
            heading_one="Name"
            heading_two="ID"
            cardData={patientsList}
          />
        </CustomSuspense>
        <CustomSuspense isLoading={allergyRecordsResponse.isLoading} fallback={<CardSkeleton />}>
          <Card
            link={`practitioner/${session?.user?.id}/health-records`}
            card_title="Health Records"
            icon={
              <FileText
                color="white"
                className="w-4 h-5 left-[4px] top-[2px] absolute"
              />
            }
            heading_one="Detail"
            heading_two="Date"
            cardData={allergyList}
          />
        </CustomSuspense>
      </div>
    </>
  );
}
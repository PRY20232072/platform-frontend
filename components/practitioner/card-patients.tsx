"use client";

import { Card } from '@/components/ui/card';
import { useApi } from '@/hooks/useApi';
import patientService from '@/services/patientService';
import { User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import CustomSuspense from '../custom-suspense';
import CardSkeleton from '../ui/skeletons/card-skeleton';

export default function CardPatients() {
  const { response: patientsResponse, fetchData: getPatients } = useApi();
  const [patientsList, setPatientsList] = useState<any>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        await getPatients(patientService.getPatientList());
      }
    };

    fetchData();
  }, [session?.user?.id]);

  useEffect(() => {
    const updatePatientsList = () => {
      const data = patientsResponse?.data;
      if (data && data.length > 0) {
        const updatedList = data.map((patient: any) => ({
          col1: patient.name_id,
          col2: patient.patient_id,
        }));
        setPatientsList(updatedList);
      } else {
        setPatientsList([]);
      }
    }

    updatePatientsList();
  }, [patientsResponse?.data]);

  return (
    <CustomSuspense
      isLoading={patientsResponse.isLoading}
      fallback={<CardSkeleton />}
    >
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
  );
}

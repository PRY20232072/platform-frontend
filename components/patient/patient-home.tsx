"use client";

import { Card } from "@/components/ui/card";
import { CardDemographic } from "@/components/ui/card-demographic";
import { useApi } from "@/hooks/useApi";
import allergyIntoleranceService from "@/services/allergyIntoleranceService";
import { Users2, TestTube2 } from 'lucide-react';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function PatientHome() {
  const {response, fetchData} = useApi();
  const [allergyList, setAllergyList] = useState<any>([]);
  const { data: session } = useSession();

  useEffect(() => {
    fetchData(allergyIntoleranceService.getAllergyByPatientId(session?.user?.id));
  }, [session?.user?.id]);

  useEffect(() => {
    setAllergyList(getAllergyList());
  }, [response?.data]);

  const getAllergyList = () => {
    let allergyList: any[] = [];
    response?.data?.map((allergy) => {
      allergyList.push({
        col1: allergy.allergy_notes,
        col2: allergy.recorded_date,
      });
    });
    return allergyList;
  }

  return (
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
          cardData={allergyList}
        />
      </div>
    </>
  );
}
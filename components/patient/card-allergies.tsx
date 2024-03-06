"use client";

import { useApi } from "@/hooks/useApi";
import allergyIntoleranceService from "@/services/allergyIntoleranceService";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CustomSuspense from "../custom-suspense";
import CardSkeleton from "../ui/skeletons/card-skeleton";
import { Card } from "../ui/card";
import { TestTube2 } from "lucide-react";

export default function CardAllergies() {
  const { response: allergiesResponse, fetchData: getAllergies } = useApi();
  const [allergyList, setAllergyList] = useState<any>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        getAllergies(
          allergyIntoleranceService.getAllergyByPatientId(
            session?.user?.id as string
          )
        );
      }
    };

    fetchData();
  }, [session?.user?.id]);

  useEffect(() => {
    const updateAllergyList = () => {
      const data = allergiesResponse?.data;
      if (data && data.length > 0) {
        const updatedList = allergiesResponse.data.map((allergy: any) => ({
          col1: allergy.allergy_notes,
          col2: allergy.recorded_date,
        }));
        setAllergyList(updatedList);
      } else {
        setAllergyList([]);
      }
    };

    updateAllergyList();
  }, [allergiesResponse?.data]);

  return (
    <CustomSuspense
      isLoading={allergiesResponse.isLoading}
      fallback={<CardSkeleton />}
    >
      <Card
        link={`patient/${session?.user?.id}/allergy-intolerance`}
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
    </CustomSuspense>
  );
}

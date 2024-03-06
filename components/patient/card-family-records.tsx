"use client";

import { Users2 } from "lucide-react";
import CustomSuspense from "../custom-suspense";
import { Card } from "../ui/card";
import CardSkeleton from "../ui/skeletons/card-skeleton";
import familyRecordService from "@/services/familyRecordService";
import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { useSession } from "next-auth/react";

export default function CardFamilyRecords() {
  const { response: familyRecordResponse, fetchData: getFamilyRecords } =
    useApi();
  const [familyRecordList, setfamilyRecordList] = useState<any>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        await getFamilyRecords(
          familyRecordService.getFamilyRecordByPatientId(
            session.user.id as string
          )
        );
      }
    };

    fetchData();
  }, [session?.user?.id]); // Se ejecutará solo cuando session?.user?.id cambie

  useEffect(() => {
    const updateFamilyRecordList = () => {
      const data = familyRecordResponse?.data;
      if (data && data.length > 0) {
        const updatedList = familyRecordResponse.data.map((familyRecord: any) => ({
          col1: familyRecord.family_record_notes,
          col2: familyRecord.recorded_date,
        }));
        setfamilyRecordList(updatedList);
      } else {
        setfamilyRecordList([]);
      }
    };

    updateFamilyRecordList();
  }, [familyRecordResponse]); // Se ejecutará solo cuando familyRecordResponse cambie

  return (
    <CustomSuspense
      isLoading={familyRecordResponse.isLoading}
      fallback={<CardSkeleton />}
    >
      <Card
        link={`patient/${session?.user?.id}/family-records`}
        card_title="Family Records"
        icon={
          <Users2
            color="white"
            className="w-5 h-[18px] left-[2px] top-[3px] absolute"
          />
        }
        heading_one="Detail"
        heading_two="Date"
        cardData={familyRecordList}
      />
    </CustomSuspense>
  );
}

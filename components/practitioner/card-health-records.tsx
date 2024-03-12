"use client";

import { Card } from "@/components/ui/card";
import { useApi } from "@/hooks/useApi";
import allergyIntoleranceService from "@/services/allergyIntoleranceService";
import { FileText } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CustomSuspense from "../custom-suspense";
import CardSkeleton from "../ui/skeletons/card-skeleton";
import familyRecordService from "@/services/familyRecordService";

export default function CardHealthRecords() {
  const [healthRecordsList, setHealthRecordsList] = useState<any>([]);
  const [allergyList, setAllergyList] = useState<any>([]);
  const { response: allergyRecordsResponse, fetchData: getAllergyRecords } =
    useApi();
  const [familyRecordList, setFamilyRecordList] = useState<any>([]);
  const { response: familyRecordsResponse, fetchData: getFamilyRecord } =
    useApi();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        await getAllergyRecords(allergyIntoleranceService.getAllergyList());
        await getFamilyRecord(familyRecordService.getFamilyRecordList());
      }
    };

    fetchData();
  }, [session?.user?.id]);

  useEffect(() => {
    const updateAllergyList = () => {
      const data = allergyRecordsResponse?.data;
      if (data && data.length > 0) {
        const updatedList = allergyRecordsResponse.data.map((allergy: any) => ({
          col1: allergy.allergy_notes,
          col2: allergy.recorded_date,
        }));
        setAllergyList(updatedList);
        setHealthRecordsList(updatedList.concat(familyRecordList));
      } else {
        setAllergyList([]);
      }
    };

    updateAllergyList();
  }, [allergyRecordsResponse?.isSuccess]);

  useEffect(() => {
    const updateFamilyRecordList = () => {
      const data = familyRecordsResponse?.data;
      if (data && data.length > 0) {
        const updatedList = familyRecordsResponse.data.map(
          (familyRecord: any) => ({
            col1: familyRecord.notes,
            col2: familyRecord.recorded_date,
          })
        );
        setFamilyRecordList(updatedList);
        setHealthRecordsList(allergyList.concat(updatedList));
      } else {
        setFamilyRecordList([]);
      }
    };

    updateFamilyRecordList();
  }, [familyRecordsResponse?.isSuccess]);

  return (
    <>
      <CustomSuspense
        isLoading={allergyRecordsResponse.isLoading || familyRecordsResponse.isLoading}
        fallback={<CardSkeleton />}
      >
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
          cardData={healthRecordsList}
        />
      </CustomSuspense>
    </>
  );
}

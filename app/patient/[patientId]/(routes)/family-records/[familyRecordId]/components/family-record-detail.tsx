"use client";

import CustomSuspense from "@/components/custom-suspense";
import FamilyRecordDetailFields from "@/components/family-records/family-record-detail-fields";
import Loading from "@/components/loading";
import { useApi } from "@/hooks/useApi";
import familyRecordService from "@/services/familyRecordService";
import { Card, CardBody } from "@nextui-org/card";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FamilyRecordDetail() {
  const [familyRecord, setFamilyRecord] = useState<any>({});
  const {
    response: getFamilyRecordByIdPatientIdResponse,
    fetchData: getFamilyRecordByIdPatientId,
  } = useApi();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (params.familyRecordId && params.patientId) {
        await getFamilyRecordByIdPatientId(
          familyRecordService.getFamilyRecordByIdPatientId(
            params.familyRecordId as string,
            params.patientId as string
          )
        );
      }
    };

    fetchData();
  }, [params.familyRecordId, params.patientId]);

  useEffect(() => {
    if (getFamilyRecordByIdPatientIdResponse.isSuccess) {
      setFamilyRecord(getFamilyRecordByIdPatientIdResponse.data);
    }
  }, [getFamilyRecordByIdPatientIdResponse.isSuccess]);

  return (
    <CustomSuspense
      isLoading={getFamilyRecordByIdPatientIdResponse.isLoading}
      fallback={<Loading />}
    >
      <Card>
        <CardBody className="items-stretch self-stretch shadow  flex flex-col mt-2.5 p-5 rounded-2xl max-md:max-w-full">
          <form className="max-md:max-w-full">
            <FamilyRecordDetailFields
              familyRecord={familyRecord}
              isEditing={false}
              handleInputChange={() => {}}
            />
          </form>
        </CardBody>
      </Card>
    </CustomSuspense>
  );
}

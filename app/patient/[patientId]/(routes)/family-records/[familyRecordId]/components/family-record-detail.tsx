"use client";

import CustomSuspense from "@/components/custom-suspense";
import { FamilyRecordDetailFields } from "@/components/family-records/family-record-detail-fields";
import Loading from "@/components/loading";
import { useApi } from "@/hooks/useApi";
import familyRecordService from "@/services/familyRecordService";
import { Card, CardBody } from "@nextui-org/card";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FamilyRecordDetail() {
  const [familyRecord, setFamilyRecord] = useState<any>({});
  const { response, fetchData } = useApi();
  const params = useParams();

  useEffect(() => {
    fetchData(
      familyRecordService.getFamilyRecordById(params.familyRecordId as string)
    );
  }, [params.familyRecordId]);

  useEffect(() => {
    if (response.isSuccess) {
      setFamilyRecord(response.data[0]);
    }
  }, [response.isSuccess]);

  return (
    <CustomSuspense isLoading={response.isLoading} fallback={<Loading />}>
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

"use client";

import AllergyDetailFields from "@/components/allergy/allergy-detail-fields";
import CustomSuspense from "@/components/custom-suspense";
import Loading from "@/components/loading";
import { useApi } from "@/hooks/useApi";
import allergyIntoleranceService from "@/services/allergyIntoleranceService";
import { Card, CardBody } from "@nextui-org/card";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AllergyDetail() {
  const [allergy, setAllergy] = useState<any>({});
  const {
    response: getAllergyByIdPatientIdResponse,
    fetchData: getAllergyByIdPatientId,
  } = useApi();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (params.allergyIntoleranceId && params.patientId) {
        await getAllergyByIdPatientId(
          allergyIntoleranceService.getAllergyByIdPatientId(
            params.allergyIntoleranceId as string,
            params.patientId as string
          )
        );
      }
    };

    fetchData();
  }, [params.allergyIntoleranceId, params.patientId]);

  useEffect(() => {
    if (getAllergyByIdPatientIdResponse.isSuccess) {
      setAllergy(getAllergyByIdPatientIdResponse.data);
    }
  }, [getAllergyByIdPatientIdResponse.isSuccess]);

  return (
    <CustomSuspense isLoading={getAllergyByIdPatientIdResponse.isLoading} fallback={<Loading />}>
      <Card>
        <CardBody className="items-stretch self-stretch shadow flex flex-col mt-2.5 p-5 rounded-2xl max-md:max-w-full">
          <form className="max-md:max-w-full">
            <AllergyDetailFields
              allergy={allergy}
              isEditing={false}
              handleInputChange={() => {}}
            />
          </form>
        </CardBody>
      </Card>
    </CustomSuspense>
  );
}

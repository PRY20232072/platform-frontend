"use client";

import AllergyDetailFields from "@/components/allergy/allergy-detail-fields";
import CustomSuspense from "@/components/custom-suspense";
import Loading from "@/components/loading";
import { useApi } from "@/hooks/useApi";
import allergyIntoleranceService from "@/services/allergyIntoleranceService";
import { Card, CardBody } from "@nextui-org/card";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type AllergyDetailProps = {
  allergy: any;
  setAllergy: any;
};

export default function AllergyDetail({ allergy, setAllergy }: AllergyDetailProps) {
  const { response, fetchData } = useApi();
  const params = useParams();

  useEffect(() => {
    fetchData(
      allergyIntoleranceService.getAllergyById(
        params.allergyIntoleranceId as string
      )
    );
  }, [params.allergyIntoleranceId]);

  useEffect(() => {
    if (response.isSuccess) {
      setAllergy(response.data[0]);
    }
  }, [response.isSuccess]);

  return (
    <CustomSuspense isLoading={response.isLoading} fallback={<Loading />}>
      <Card>
        <CardBody className="items-stretch self-stretch shadow  flex flex-col mt-2.5 p-5 rounded-2xl max-md:max-w-full">
          <div className="text-2xl font-bold leading-6 max-md:max-w-full">
            Allergy Record Information
          </div>
          <form className="mt-8 max-md:max-w-full">
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

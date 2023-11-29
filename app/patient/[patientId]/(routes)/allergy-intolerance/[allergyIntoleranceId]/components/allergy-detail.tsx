"use client";

import CustomSuspense from "@/components/custom-suspense";
import Loading from "@/components/loading";
import { CustomAutocomplete } from "@/components/ui/auto-complete";
import { allergyCategories, allergyStatus, allergyTypes } from "@/data/data";
import { useApi } from "@/hooks/useApi";
import allergyIntoleranceService from "@/services/allergyIntoleranceService";
import { Card, CardBody } from "@nextui-org/card";
import { Input, Textarea } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AllergyDetail() {
  const [allergy, setAllergy] = useState<any>({});
  const { response, fetchData } = useApi();
  const params = useParams();

  useEffect(() => {
    fetchData(allergyIntoleranceService.getAllergyById(params.allergyIntoleranceId as string));
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
            <div className="  gap-5 flex max-md:flex-col max-md:items-stretch ">
              <div className="  flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
                <Input
                  isReadOnly
                  className="mb-4"
                  type="text"
                  label="Name"
                  labelPlacement="outside"
                  placeholder={allergy.name}
                  value={allergy.name}
                />

                <CustomAutocomplete
                  isDisabled={true}
                  label="Category"
                  labelPlacement="outside"
                  placeholder="Food"
                  data={allergyCategories}
                  inputValue={allergy.category}
                />
              </div>
              <div className="  flex flex-col items-stretch w-[34%] ml-5 max-md:w-full max-md:ml-0">
                <CustomAutocomplete
                  isDisabled={true}
                  label="Status"
                  labelPlacement="outside"
                  placeholder="Active"
                  data={allergyStatus}
                  inputValue={allergy.clinical_status}
                />

                <Input
                  isReadOnly
                  type="date"
                  label="Recorded date"
                  labelPlacement="outside"
                  placeholder={allergy.recorded_date}
                  value={allergy.recorded_date}
                />
              </div>
              <div className=" flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                <CustomAutocomplete
                  isDisabled={true}
                  label="Type"
                  labelPlacement="outside"
                  placeholder="Dairy"
                  data={allergyTypes}
                  inputValue={allergy.type}
                />

                <Textarea
                  isReadOnly
                  disableAnimation
                  disableAutosize
                  classNames={{ input: 'resize-y min-h-[40px]' }}
                  label="Note"
                  labelPlacement="outside"
                  placeholder={allergy.allergy_notes}
                />
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
    </CustomSuspense>
  );
}
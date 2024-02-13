'use client';

import CustomSuspense from '@/components/custom-suspense';
import Loading from '@/components/loading';
import { CustomAutocomplete } from '@/components/ui/auto-complete';
import { familyRecordStatus, genders } from '@/data/data';
import { useApi } from '@/hooks/useApi';
import familyRecordService from '@/services/familyRecordService';
import { Card, CardBody } from '@nextui-org/card';
import { Input, Textarea } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
          <div className="text-2xl font-bold leading-6 max-md:max-w-full">
            Family Record Information
          </div>
          <form className="mt-8 mb-8 max-md:max-w-full">
            <div className="  gap-5 flex max-md:flex-col max-md:items-stretch ">
              <div className="  flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
                <Input
                  isReadOnly
                  className="mb-4"
                  type="text"
                  label="Name"
                  labelPlacement="outside"
                  placeholder={familyRecord.name}
                  value={familyRecord.name}
                />
                <Input
                  isReadOnly
                  className="mb-4"
                  type="text"
                  label="Reason"
                  labelPlacement="outside"
                  placeholder={familyRecord.reason}
                  value={familyRecord.reason}
                />
              </div>
              <div className="  flex flex-col items-stretch w-[34%] ml-5 max-md:w-full max-md:ml-0">
                <CustomAutocomplete
                  isDisabled={true}
                  label="Status"
                  labelPlacement="outside"
                  placeholder="Active"
                  data={familyRecordStatus}
                  inputValue={familyRecord.clinical_status}
                />
                <Textarea
                  isReadOnly
                  disableAnimation
                  disableAutosize
                  classNames={{ input: 'resize-y min-h-[20px]' }}
                  label="Note"
                  labelPlacement="outside"
                  placeholder={familyRecord.notes}
                />
              </div>
              <div className=" flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                <Input
                  isReadOnly
                  type="date"
                  label="Recorded date"
                  labelPlacement="outside"
                  placeholder={familyRecord.recorded_date}
                  value={familyRecord.recorded_date}
                />
              </div>
            </div>
          </form>
          <div className="text-2xl font-bold leading-6 max-md:max-w-full">
            Relative Information
          </div>
          <form className="mt-8 mb-8 max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch ">
              <div className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
                <Input
                  isReadOnly
                  className="mb-4"
                  type="text"
                  label="Relative Name"
                  labelPlacement="outside"
                  placeholder={familyRecord.name}
                  value={familyRecord.name}
                />
              </div>
              <div className="  flex flex-col items-stretch w-[34%] ml-5 max-md:w-full max-md:ml-0">
                <CustomAutocomplete
                  isDisabled={true}
                  label="Gender"
                  labelPlacement="outside"
                  placeholder="Male"
                  data={genders}
                  inputValue={familyRecord.gender}
                />
              </div>
              <div className=" flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                <Input
                  isReadOnly
                  type="date"
                  label="Birthdate"
                  labelPlacement="outside"
                  placeholder={familyRecord.relative_birthdate}
                  value={familyRecord.relative_birthdate}
                />
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
    </CustomSuspense>
  );
}

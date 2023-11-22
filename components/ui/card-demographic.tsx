'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { FileText } from 'lucide-react';
import {
  Card as CardNextUI,
  CardHeader,
  CardBody,
  Divider,
  Button,
} from '@nextui-org/react';
import { emptyPatient } from '@/data/data';
import { useApi } from '@/hooks/useApi';
import { useSession } from 'next-auth/react';
import patientService from '@/services/patientService';

interface DemographicInfoProps {
  label: string;
  value: string;
}

const DemographicInfo = ({ label, value }: DemographicInfoProps) => (
  <div className="self-stretch h-12 flex-col justify-start items-start flex">
    <div className="self-stretch text-neutral-400 text-sm font-normal leading-normal">
      {label}
    </div>
    <div className="self-stretch  text-sm font-normal leading-normal">
      {value}
    </div>
  </div>
);

export const CardDemographic = () => {
  const [patient, setPatient] = useState(emptyPatient);
  const [isRegisterPatient, setIsRegisterPatient] = useState<boolean>(false);
  const { response: getPatientByIdResponse, fetchData: getPatientById } = useApi();
  const { data: session } = useSession();

  useEffect(() => {
    getPatientById(patientService.getPatientById(session?.user?.id));
  }, [session?.user?.id]);

  useEffect(() => {
    if (getPatientByIdResponse.isSuccess) {
      setPatient(getPatientByIdResponse.data.data);
      setIsRegisterPatient(true);
    }
    else {
      setIsRegisterPatient(false);
    }
  }, [getPatientByIdResponse.isSuccess]);

  return (
    <CardNextUI className="!w-full !h-[302px] !z-0 ![overflow:unset] !min-w-[355px] rounded-[14px] shadow inline-flex flex-col justify-start items-start">
      <CardHeader className="p-5 flex justify-start items-center gap-2.5 border-b border-zinc-300">
        <div className="w-14 h-14 relative">
          <div className="w-14 h-14 left-0 top-0 absolute bg-blue-600 rounded-xl" />
          <div className="w-6 h-6 left-[16px] top-[16px] absolute">
            <FileText
              color="white"
              className="w-4 h-5 left-[4px] top-[2px] absolute"
            />
          </div>
        </div>

        <div className=" text-base font-bold  leading-normal">
          Demographic information
        </div>

        <div className="flex flex-grow flex-shrink flex-basis-0 h-8 justify-end items-center gap-2.5">
          <Button
            className={'bg-sky-100 text-blue-600 text-sm font-medium '}
            color="primary"
            radius="sm"
            size="sm"
            variant={'solid'}
          >
            <Link href="patient/undefined/demographic">See more</Link>

          </Button>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-row justify-start items-start p-5 space-x-6">
        {getPatientByIdResponse.isLoading ? (
          <div className="flex text-center">Loading...</div>
        ) : (
          <>
            {isRegisterPatient ? (
              <>
                <div className="flex-1">
                  <DemographicInfo label="ID" value={session?.user?.id} />
                  <DemographicInfo label="Gender" value={patient.gender} />
                  <DemographicInfo label="Address" value={patient.address.address_line} />
                </div>

                <div className="flex-1">
                  <DemographicInfo label="Full name" value={patient.name_id} />
                  <DemographicInfo label="Birthdate" value={patient.birthDate} />
                  <DemographicInfo label="Phone Number" value={patient.telephone} />
                </div>
              </>
            ) : (
              <div className="flex text-center">
                Update your demographic information.
              </div>
            )}
          </>
        )}
      </CardBody>
    </CardNextUI>
  );
};

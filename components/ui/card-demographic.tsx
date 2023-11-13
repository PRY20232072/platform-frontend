'use client';
import React from 'react';
import Link from 'next/link';

import { FileText } from 'lucide-react';
import {
  Card as CardNextUI,
  CardHeader,
  CardBody,
  Divider,
  Button,
} from '@nextui-org/react';

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
        <div className="flex-1">
          <DemographicInfo label="ID" value="81823182" />
          <DemographicInfo label="Gender" value="Male" />
          <DemographicInfo label="Address" value="Av. Brazil 123" />
        </div>

        <div className="flex-1">
          <DemographicInfo label="Full name" value="Jhon Doe" />
          <DemographicInfo label="Birthdate" value="01/01/1999" />
          <DemographicInfo label="Phone Number" value="987654321" />
        </div>
      </CardBody>
    </CardNextUI>
  );
};

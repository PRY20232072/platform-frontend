'use client';
import React from 'react';
import { Users2 } from 'lucide-react';
import {
  Card as CardNextUI,
  CardHeader,
  CardBody,
  Divider,
  Button,
} from '@nextui-org/react';

export const CardFamilyHistory = () => {
  return (
    <CardNextUI className="!flex-1 !max-w-[535px] !min-w-[355px] !w-[unset] !grow">
      <CardHeader className="self-stretch p-5 border-b border-zinc-300 justify-start items-center gap-2.5 inline-flex">
        <div className="w-14 h-14 relative">
          <div className="w-14 h-14 left-0 top-0 absolute bg-blue-600 rounded-xl" />
          <div className="w-6 h-6 left-[16px] top-[16px] absolute">
            <Users2
              color="white"
              className="w-5 h-[18px] left-[2px] top-[3px] absolute"
            />
          </div>
        </div>

        <div className=" text-base font-bold   leading-normal">
          Family History
        </div>

        <div className="flex-grow flex-shrink flex-basis-0 h-8 justify-end items-center gap-2.5 flex">
          <Button
            className="
              bg-sky-100 text-blue-600 text-sm font-medium justify-center items-center gap-3 flex
            "
            color="primary"
            radius="lg"
            size="sm"
            variant={'solid'}
          >
            See more
          </Button>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-row justify-start items-start space-x-6 ">
        <div className="flex-1 flex-col justify-start p-5 items-start gap-2.5 inline-flex">
          <div className="self-stretch text-sm font-bold leading-normal">
            Datail
          </div>
          <div className=" text-sm font-normal leading-normal">
            Medical consultation
          </div>
          <div className=" text-sm font-normal leading-normal">
            Flu treatment
          </div>
          <div className=" text-sm font-normal leading-normal">Back pain</div>
        </div>

        <div className="flex-1 w-40 self-stretch p-5 border-l border-zinc-300 flex-col justify-start items-start gap-2.5 inline-flex">
          <div className="self-stretch  text-sm font-bold leading-normal">
            Date
          </div>
          <div className=" text-sm font-normal leading-normal">24/09/2023</div>
          <div className=" text-sm font-normal leading-normal">24/09/2023</div>
          <div className=" text-sm font-normal leading-normal">24/09/2023</div>
        </div>
      </CardBody>
    </CardNextUI>
  );
};

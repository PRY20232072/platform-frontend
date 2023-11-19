import { Button, Input } from '@nextui-org/react';

import { civilStatus, genders, addressTypes } from '@/data/data';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/utils/authOptions';
import { CustomAutocomplete } from '@/components/ui/auto-complete';
import { User2, Pencil } from 'lucide-react';
export default async function DemographicPage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col  items-center gap-5 px-4 py-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-32">
      <div className="justify-between items-center  border-b border-gray-200 flex w-full max-w-[1100px] gap-5 mt-1 max-md:max-w-full max-md:flex-wrap">
        <div className="flex grow basis-[0%] flex-col items-stretch my-auto max-md:max-w-full">
          <div className="text-4xl font-bold leading-10 max-md:max-w-full">
            Demographic information
          </div>
          <div className="justify-center text-neutral-400 text-2xl leading-10 max-md:max-w-full">
            {session?.user?.name} | {session?.user?.email}
          </div>
          <div className="justify-center text-neutral-400 text-base leading-10 max-md:max-w-full">
            ID: {session?.user?.id}
          </div>
        </div>
        <div className="relative w-[116px] h-[115.5px]">
          <div className="w-24 h-24 px-1.5 py-1.5 left-0 top-[15.50px] absolute bg-blue-600 rounded-2xl justify-center items-center inline-flex">
            <User2
              className="w-12 h-12 px-2.5 py-1 flex-col justify-start items-center gap-0.5 inline-flex"
              color="white"
            />
          </div>
          <div className="w-8 h-8 left-[84px] top-0 absolute">
            <div className="w-8 h-8 left-0 top-0 absolute bg-blue-100 rounded-full">
              <Pencil
                className="w-4 h-4  top-1/4 left-1/4 absolute"
                color="black"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="mb-4 font-bold text-2xl tracking-[0] leading-[24px]">
            General information
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="mb-4">
              <Input
                isReadOnly
                type="text"
                label="Full name"
                labelPlacement="outside"
                placeholder="Jhon Doe"
              />
            </div>
            <CustomAutocomplete
              label="Gender"
              labelPlacement="outside"
              placeholder="Male"
              data={genders}
            />

            <div className="mb-4">
              <Input
                isReadOnly
                type="date"
                label="Birthdate"
                labelPlacement="outside"
                placeholder="01/01/1999"
              />
            </div>
            <CustomAutocomplete
              label="Civil Status"
              labelPlacement="outside"
              placeholder="Single"
              data={civilStatus}
            />

            <div className=" flex-col items-start gap-[5px] relative !flex-1 !flex !grow">
              <Input
                isReadOnly
                type="tel"
                label="Phone number"
                labelPlacement="outside"
                placeholder="987654321"
              />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="  mb-4 font-bold  text-2xl tracking-[0] leading-[24px]">
            Address
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CustomAutocomplete
              label="Type of address"
              labelPlacement="outside"
              placeholder="Physical"
              data={addressTypes}
            />

            <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
              <Input
                isReadOnly
                type="text"
                label="Address line"
                labelPlacement="outside"
                placeholder="Av. Brazil"
              />
            </div>
            <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
              <Input
                isReadOnly
                type="text"
                label="District"
                labelPlacement="outside"
                placeholder="Lima"
              />
            </div>
            <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
              <Input
                isReadOnly
                type="text"
                label="City"
                labelPlacement="outside"
                placeholder="Lima"
              />
            </div>
            <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
              <Input
                isReadOnly
                type="text"
                label="Country"
                labelPlacement="outside"
                placeholder="Peru"
              />
            </div>
            <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
              <Input
                isReadOnly
                type="text"
                label="Postal code"
                labelPlacement="outside"
                placeholder="20010"
              />
            </div>
          </div>
        </div>
      </div>
      <Button className="text-white  font-medium leading-6 whitespace-nowrap justify-center items-center bg-blue-600 self-center w-[77px] max-w-full mt-2 px-4 py-3 rounded-xl">
        Edit
      </Button>
    </div>
  );
}

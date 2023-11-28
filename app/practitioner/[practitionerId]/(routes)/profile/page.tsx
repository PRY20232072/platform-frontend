"use client";

import { Pencil, User2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useApi } from '@/hooks/useApi';
import {
    addressTypes,
    civilStatus,
    emptyPractitioner, genders
  } from '@/data/data';
import practitionerService from "@/services/practitionerService";
import { CustomAutocomplete } from "@/components/ui/auto-complete";
import { Button, Input } from '@nextui-org/react';

export default function PractitionerProfile() {
    const [practitioner, serPractitioner] = useState(emptyPractitioner);
    const [isRegisterPractitioner, setIsRegisterPractitioner] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const { response: getPractitionerByIdResponse, fetchData: getPractitionerById } = useApi();
    const { response: updatePatientResponse, fetchData: updatePatient } = useApi();
    const { response: createPatientResponse, fetchData: createPatient } = useApi();
    const { data: session } = useSession();
  
    useEffect(() => {
        getPractitionerById(practitionerService.getPractitionerById(session?.user?.id as string));
    }, [session?.user?.id]);
  
    useEffect(() => {
      if (getPractitionerByIdResponse.isSuccess) {
        serPractitioner(getPractitionerByIdResponse.data.data);
        setIsRegisterPractitioner(true);
      }
      else {
        setIsRegisterPractitioner(false);
      }
    }, [getPractitionerByIdResponse.isSuccess]);
  
    useEffect(() => {
      if (updatePatientResponse.isSuccess) {
        getPractitionerById(practitionerService.getPractitionerById(session?.user?.id as string));
      }
    }, [updatePatientResponse.isSuccess, createPatientResponse.isSuccess]);
  
    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isRegisterPractitioner) {
        await updatePatient(practitionerService.updatePractitioner(session?.user?.id as string, practitioner));
      }
      else {
        await createPatient(practitionerService.createPractitioner(session?.user?.id as string, practitioner));
      }
      setIsEditing(!isEditing);
    };
  
    return (
      <div className="flex flex-col  items-center gap-5 px-4 py-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-32">
  
        <div className="justify-between items-center  border-b border-gray-200 flex w-full max-w-[1100px] gap-5 mt-1 max-md:max-w-full max-md:flex-wrap">
          <div className="flex grow basis-[0%] flex-col items-stretch my-auto max-md:max-w-full">
            <div className="text-4xl font-bold leading-10 max-md:max-w-full">
              Profile
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
        {getPractitionerByIdResponse.isLoading ? (<div>Loading...</div>) : (
          <form onSubmit={handleEdit}>
            <div className="w-full max-w-4xl mx-auto">
              <div className="mb-8">
                <div className="mb-4 font-bold text-2xl tracking-[0] leading-[24px]">
                  General information
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="mb-4">
                    <Input
                      isReadOnly={!isEditing}
                      type="text"
                      label="Full name"
                      labelPlacement="outside"
                      placeholder="Complete full name"
                      value={practitioner.name_id}
                      onChange={(e) => {
                        serPractitioner({ ...practitioner, name_id: e.target.value });
                      }}
                    />
                  </div>
                  <CustomAutocomplete
                    isDisabled={!isEditing}
                    label="Gender"
                    labelPlacement="outside"
                    placeholder="Select an option"
                    data={genders}
                    inputValue={practitioner.gender}
                    onInputChange={(value) => {
                      serPractitioner({ ...practitioner, gender: value })
                    }}
                  />
  
                  <div className="mb-4">
                    <Input
                      isReadOnly={!isEditing}
                      type="date"
                      label="Birthdate"
                      labelPlacement="outside"
                      placeholder="Complete date"
                      value={practitioner.birthDate}
                      onChange={(e) => {
                        serPractitioner({ ...practitioner, birthDate: e.target.value });
                      }}
                    />
                  </div>
                  <CustomAutocomplete
                    isDisabled={!isEditing}
                    label="Civil Status"
                    labelPlacement="outside"
                    placeholder="Select an option"
                    data={civilStatus}
                    inputValue={practitioner.maritalStatus}
                    onInputChange={(value) => {
                      serPractitioner({ ...practitioner, maritalStatus: value })
                    }}
                  />
  
                  <div className=" flex-col items-start gap-[5px] relative !flex-1 !flex !grow">
                    <Input
                      isReadOnly={!isEditing}
                      type="tel"
                      label="Phone number"
                      labelPlacement="outside"
                      placeholder="Complete phone number"
                      value={practitioner.telephone}
                      onChange={(e) => {
                        serPractitioner({ ...practitioner, telephone: e.target.value });
                      }}
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
                    isDisabled={!isEditing}
                    label="Type of address"
                    labelPlacement="outside"
                    placeholder="Select an option"
                    data={addressTypes}
                    inputValue={practitioner.address.type_address}
                    onInputChange={(value) => {
                      serPractitioner({ ...practitioner, address: { ...practitioner.address, type_address: value } })
                    }}
                  />
  
                  <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
                    <Input
                      isReadOnly={!isEditing}
                      type="text"
                      label="Address line"
                      labelPlacement="outside"
                      placeholder="Complete address line"
                      value={practitioner.address.address_line}
                      onChange={(e) => {
                        serPractitioner({ ...practitioner, address: { ...practitioner.address, address_line: e.target.value } })
                      }}
                    />
                  </div>
                  <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
                    <Input
                      isReadOnly={!isEditing}
                      type="text"
                      label="District"
                      labelPlacement="outside"
                      placeholder="Complete district"
                      value={practitioner.address.district}
                      onChange={(e) => {
                        serPractitioner({ ...practitioner, address: { ...practitioner.address, district: e.target.value } })
                      }}
                    />
                  </div>
                  <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
                    <Input
                      isReadOnly={!isEditing}
                      type="text"
                      label="City"
                      labelPlacement="outside"
                      placeholder="Complete city"
                      value={practitioner.address.city}
                      onChange={(e) => {
                        serPractitioner({ ...practitioner, address: { ...practitioner.address, city: e.target.value } })
                      }}
                    />
                  </div>
                  <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
                    <Input
                      isReadOnly={!isEditing}
                      type="text"
                      label="Country"
                      labelPlacement="outside"
                      placeholder="Complete country"
                      value={practitioner.address.country}
                      onChange={(e) => {
                        serPractitioner({ ...practitioner, address: { ...practitioner.address, country: e.target.value } })
                      }}
                    />
                  </div>
                  <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
                    <Input
                      isReadOnly={!isEditing}
                      type="text"
                      label="Postal code"
                      labelPlacement="outside"
                      placeholder="Complete postal code"
                      value={practitioner.address.postal_code}
                      onChange={(e) => {
                        serPractitioner({ ...practitioner, address: { ...practitioner.address, postal_code: e.target.value } })
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              {(isEditing ? (
                <>
                  <Button
                    className="text-red-600 font-medium leading-6 whitespace-nowrap justify-center items-center bg-red-300 self-center w-[77px] max-w-full mt-2 px-4 py-3 rounded-xl"
                    onClick={() => {
                      setIsEditing(!isEditing);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="text-white font-medium leading-6 whitespace-nowrap justify-center items-center bg-amber-500 self-center w-[77px] max-w-full mt-2 ml-4 px-4 py-3 rounded-xl"
                    type='submit'
                  >
                    Save
                  </Button>
                </>
              ) : (
                <Button
                  className="text-white font-medium leading-6 whitespace-nowrap justify-center items-center bg-blue-600 self-center w-[77px] max-w-full mt-2 px-4 py-3 rounded-xl"
                  onClick={() => {
                    setIsEditing(!isEditing);
                  }}
                >
                  Edit
                </Button>
              ))}
            </div>
          </form>)}
      </div>
    );
}
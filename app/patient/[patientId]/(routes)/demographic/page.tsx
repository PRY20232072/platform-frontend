"use client";

import { Button, Input } from '@nextui-org/react';

import { civilStatus, genders, addressTypes } from '@/data/data';
import { CustomAutocomplete } from '@/components/ui/auto-complete';
import { User2, Pencil } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useApi } from '@/hooks/useApi';
import patientService from '@/services/patientService';
import { useEffect, useState } from 'react';
import {
  emptyPatient
} from '@/data/data';

export default function DemographicPage() {
  const [patient, setPatient] = useState(emptyPatient);
  const [isRegisterPatient, setIsRegisterPatient] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { response: getPatientByIdResponse, fetchData: getPatientById } = useApi();
  const { response: updatePatientResponse, fetchData: updatePatient } = useApi();
  const { response: createPatientResponse, fetchData: createPatient } = useApi();
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

  useEffect(() => {
    if (updatePatientResponse.isSuccess) {
      getPatientById(patientService.getPatientById(session?.user?.id));
    }
  }, [updatePatientResponse.isSuccess, createPatientResponse.isSuccess]);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isRegisterPatient) {
      await updatePatient(patientService.updatePatient(session?.user?.id, patient));
    }
    else {
      await createPatient(patientService.createPatient(session?.user?.id, patient));
    }
    setIsEditing(!isEditing);
  };

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
      {getPatientByIdResponse.isLoading ? (<div>Loading...</div>) : (
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
                    value={patient.name_id}
                    onChange={(e) => {
                      setPatient({ ...patient, name_id: e.target.value });
                    }}
                  />
                </div>
                <CustomAutocomplete
                  isDisabled={!isEditing}
                  label="Gender"
                  labelPlacement="outside"
                  placeholder="Select an option"
                  data={genders}
                  inputValue={patient.gender}
                  onInputChange={(value) => {
                    setPatient({ ...patient, gender: value })
                  }}
                />

                <div className="mb-4">
                  <Input
                    isReadOnly={!isEditing}
                    type="date"
                    label="Birthdate"
                    labelPlacement="outside"
                    placeholder="Complete date"
                    value={patient.birthDate}
                    onChange={(e) => {
                      setPatient({ ...patient, birthDate: e.target.value });
                    }}
                  />
                </div>
                <CustomAutocomplete
                  isDisabled={!isEditing}
                  label="Civil Status"
                  labelPlacement="outside"
                  placeholder="Select an option"
                  data={civilStatus}
                  inputValue={patient.maritalStatus}
                  onInputChange={(value) => {
                    setPatient({ ...patient, maritalStatus: value })
                  }}
                />

                <div className=" flex-col items-start gap-[5px] relative !flex-1 !flex !grow">
                  <Input
                    isReadOnly={!isEditing}
                    type="tel"
                    label="Phone number"
                    labelPlacement="outside"
                    placeholder="Complete phone number"
                    value={patient.telephone}
                    onChange={(e) => {
                      setPatient({ ...patient, telephone: e.target.value });
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
                  inputValue={patient.address.type_address}
                  onInputChange={(value) => {
                    setPatient({ ...patient, address: { ...patient.address, type_address: value } })
                  }}
                />

                <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
                  <Input
                    isReadOnly={!isEditing}
                    type="text"
                    label="Address line"
                    labelPlacement="outside"
                    placeholder="Complete address line"
                    value={patient.address.address_line}
                    onChange={(e) => {
                      setPatient({ ...patient, address: { ...patient.address, address_line: e.target.value } })
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
                    value={patient.address.district}
                    onChange={(e) => {
                      setPatient({ ...patient, address: { ...patient.address, district: e.target.value } })
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
                    value={patient.address.city}
                    onChange={(e) => {
                      setPatient({ ...patient, address: { ...patient.address, city: e.target.value } })
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
                    value={patient.address.country}
                    onChange={(e) => {
                      setPatient({ ...patient, address: { ...patient.address, country: e.target.value } })
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
                    value={patient.address.postal_code}
                    onChange={(e) => {
                      setPatient({ ...patient, address: { ...patient.address, postal_code: e.target.value } })
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

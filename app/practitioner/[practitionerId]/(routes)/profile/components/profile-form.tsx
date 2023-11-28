"use client";

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
import CustomSuspense from "@/components/custom-suspense";
import Loading from "@/components/loading";
import { toast } from "react-toastify";

export default function PractitionerProfileForm() {
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

    //show toast
    toast.info("Info updated", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    });
  };

  return (
    <CustomSuspense isLoading={getPractitionerByIdResponse.isLoading} fallback={<Loading />}>
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
      </form>
    </CustomSuspense>
  );
}

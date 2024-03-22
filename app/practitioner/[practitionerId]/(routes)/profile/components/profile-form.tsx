"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import {
  addressTypes,
  civilStatus,
  emptyPractitioner,
  genders,
} from "@/data/data";
import practitionerService from "@/services/practitionerService";
import { CustomAutocomplete } from "@/components/ui/auto-complete";
import { Button, Input } from "@nextui-org/react";
import CustomSuspense from "@/components/custom-suspense";
import Loading from "@/components/loading";
import { toast } from "react-toastify";
import departments from "@/data/departments.json";
import provincesData from "@/data/provinces.json";
import districsData from "@/data/districts.json";

export default function PractitionerProfileForm() {
  const [isInvalid, setIsInvalid] = useState(false);
  const validatePhone = (phone: string) => phone.match(/^9\d{8}$/);
  const [practitioner, serPractitioner] = useState(emptyPractitioner);
  const [provincesOptions, setProvincesOptions] = useState<
    { id: string; name: string; department_id: string }[]
  >([]);
  const [districtsOptions, setDistrictsOptions] = useState<
    { id: string; name: string; province_id: string }[]
  >([]);

  useEffect(() => {
    setIsInvalid(
      practitioner.telephone ? !validatePhone(practitioner.telephone) : false
    );
  }, [practitioner.telephone]);

  useEffect(() => {
    if (practitioner.address.department) {
      const selectedDepartment = departments.find(
        (department) => department.name === practitioner.address.department
      );
      if (selectedDepartment) {
        const provinces = provincesData.filter(
          (province) => province.department_id === selectedDepartment.id
        );
        setProvincesOptions(provinces);
      }
    } else {
      practitioner.address.province = "";
      setProvincesOptions([]);
    }
  }, [practitioner.address.department]);

  useEffect(() => {
    if (practitioner.address.province) {
      const selectedProvince = provincesData.find(
        (province) => province.name === practitioner.address.province
      );

      if (selectedProvince) {
        const districts = districsData.filter(
          (district) => district.province_id === selectedProvince.id
        );
        setDistrictsOptions(districts);
      }
    } else {
      practitioner.address.district = "";
      setDistrictsOptions([]);
    }
  }, [practitioner.address.province]);

  const [isRegisterPractitioner, setIsRegisterPractitioner] =
    useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const {
    response: getPractitionerByIdResponse,
    fetchData: getPractitionerById,
  } = useApi();
  const { response: updatePatientResponse, fetchData: updatePatient } =
    useApi();
  const { response: createPatientResponse, fetchData: createPatient } =
    useApi();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        await getPractitionerById(
          practitionerService.getPractitionerById(session?.user?.id as string)
        );
      }
    };

    fetchData();
  }, [session?.user?.id]);

  useEffect(() => {
    if (getPractitionerByIdResponse.isSuccess) {
      serPractitioner(getPractitionerByIdResponse.data);
      setIsRegisterPractitioner(true);
    } else {
      setIsRegisterPractitioner(false);
    }
  }, [getPractitionerByIdResponse.isSuccess]);

  useEffect(() => {
    if (updatePatientResponse.isSuccess) {
      getPractitionerById(
        practitionerService.getPractitionerById(session?.user?.id as string)
      );
    }
  }, [updatePatientResponse.isSuccess, createPatientResponse.isSuccess]);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (practitioner.telephone && !practitioner.telephone.match(/^9\d{8}$/)) {
      toast.error("Invalid phone number", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
    if (isRegisterPractitioner) {
      await updatePatient(
        practitionerService.updatePractitioner(
          session?.user?.id as string,
          practitioner
        )
      );
    } else {
      await createPatient(
        practitionerService.createPractitioner(
          session?.user?.id as string,
          practitioner
        )
      );
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
      theme: "colored",
    });
  };

  return (
    <CustomSuspense
      isLoading={getPractitionerByIdResponse.isLoading}
      fallback={<Loading />}
    >
      <form onSubmit={handleEdit}>
        <div className='w-full max-w-4xl mx-auto'>
          <div className='mb-8'>
            <div className='mb-4 font-bold text-2xl tracking-[0] leading-[24px]'>
              General information
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <div className='mb-4'>
                <Input
                  isRequired
                  isReadOnly={!isEditing}
                  type='text'
                  label='Full name'
                  labelPlacement='outside'
                  placeholder='Complete full name'
                  value={practitioner.name_id}
                  onChange={(e) => {
                    serPractitioner({
                      ...practitioner,
                      name_id: e.target.value,
                    });
                  }}
                />
              </div>
              <CustomAutocomplete
                isDisabled={!isEditing}
                label='Gender'
                labelPlacement='outside'
                placeholder='Select an option'
                data={genders}
                inputValue={practitioner.gender}
                onInputChange={(value) => {
                  serPractitioner({ ...practitioner, gender: value });
                }}
              />

              <div className='mb-4'>
                <Input
                  isRequired
                  isReadOnly={!isEditing}
                  type='date'
                  label='Birthdate'
                  labelPlacement='outside'
                  placeholder='Complete date'
                  value={practitioner.birthDate}
                  onChange={(e) => {
                    serPractitioner({
                      ...practitioner,
                      birthDate: e.target.value,
                    });
                  }}
                />
              </div>
              <CustomAutocomplete
                isDisabled={!isEditing}
                label='Civil Status'
                labelPlacement='outside'
                placeholder='Select an option'
                data={civilStatus}
                inputValue={practitioner.maritalStatus}
                onInputChange={(value) => {
                  serPractitioner({ ...practitioner, maritalStatus: value });
                }}
              />

              <div className='flex-col items-start gap-[5px] relative !flex-1 !flex !grow'>
                <Input
                  isRequired
                  startContent={
                    <span className='text-default-400 text-small'>+51</span>
                  }
                  isReadOnly={!isEditing}
                  type='tel'
                  label='Phone number'
                  labelPlacement='outside'
                  placeholder='Complete phone number'
                  isInvalid={isInvalid}
                  color={isInvalid ? "danger" : "default"}
                  value={practitioner.telephone}
                  onChange={(e) => {
                    serPractitioner({
                      ...practitioner,
                      telephone: e.target.value,
                    });
                  }}
                  errorMessage={
                    isInvalid && "Please enter a valid phone number"
                  }
                />
              </div>
            </div>
          </div>
          <div className='mb-8'>
            <div className='mb-4 font-bold  text-2xl tracking-[0] leading-[24px]'>
              Address
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <CustomAutocomplete
                isDisabled={!isEditing}
                label='Department'
                labelPlacement='outside'
                placeholder='Select a department'
                data={departments.map((department) => ({
                  value: department.id,
                  label: department.name,
                }))}
                inputValue={practitioner.address.department}
                onInputChange={(value) => {
                  serPractitioner({
                    ...practitioner,
                    address: { ...practitioner.address, department: value },
                  });
                }}
              />

              <CustomAutocomplete
                isDisabled={!isEditing || !practitioner.address.department}
                label='Province'
                labelPlacement='outside'
                placeholder='Select a province'
                data={provincesOptions.map((provinces) => ({
                  value: provinces.id,
                  label: provinces.name,
                }))}
                inputValue={practitioner.address.province}
                onInputChange={(value) => {
                  serPractitioner({
                    ...practitioner,
                    address: { ...practitioner.address, province: value },
                  });
                }}
              />

              <CustomAutocomplete
                isDisabled={!isEditing || !practitioner.address.province}
                label='District'
                labelPlacement='outside'
                placeholder='Select a district'
                data={districtsOptions.map((districts) => ({
                  value: districts.id,
                  label: districts.name,
                }))}
                inputValue={practitioner.address.district}
                onInputChange={(value) => {
                  serPractitioner({
                    ...practitioner,
                    address: { ...practitioner.address, district: value },
                  });
                }}
              />

              <CustomAutocomplete
                isDisabled={!isEditing}
                label='Type of address'
                labelPlacement='outside'
                placeholder='Select an option'
                data={addressTypes}
                inputValue={practitioner.address.type_address}
                onInputChange={(value) => {
                  serPractitioner({
                    ...practitioner,
                    address: { ...practitioner.address, type_address: value },
                  });
                }}
              />

              <div className='inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]'>
                <Input
                  isRequired
                  isReadOnly={!isEditing}
                  type='text'
                  label='Address line'
                  labelPlacement='outside'
                  placeholder='Complete address line'
                  value={practitioner.address.address_line}
                  onChange={(e) => {
                    serPractitioner({
                      ...practitioner,
                      address: {
                        ...practitioner.address,
                        address_line: e.target.value,
                      },
                    });
                  }}
                />
              </div>

              <div className='inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]'>
                <Input
                  isRequired
                  isReadOnly={!isEditing}
                  type='text'
                  label='Postal code'
                  labelPlacement='outside'
                  placeholder='Complete postal code'
                  value={practitioner.address.postal_code}
                  onChange={(e) => {
                    serPractitioner({
                      ...practitioner,
                      address: {
                        ...practitioner.address,
                        postal_code: e.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          {isEditing ? (
            <>
              <Button
                className='text-red-600 font-medium leading-6 whitespace-nowrap justify-center items-center bg-red-300 self-center w-[77px] max-w-full mt-2 px-4 py-3 rounded-xl'
                onClick={() => {
                  setIsEditing(!isEditing);
                }}
              >
                Cancel
              </Button>
              <Button
                className='text-white font-medium leading-6 whitespace-nowrap justify-center items-center bg-amber-500 self-center w-[77px] max-w-full mt-2 ml-4 px-4 py-3 rounded-xl'
                type='submit'
              >
                Save
              </Button>
            </>
          ) : (
            <Button
              className='text-white font-medium leading-6 whitespace-nowrap justify-center items-center bg-blue-600 self-center w-[77px] max-w-full mt-2 px-4 py-3 rounded-xl'
              onClick={() => {
                setIsEditing(!isEditing);
              }}
            >
              Edit
            </Button>
          )}
        </div>
      </form>
    </CustomSuspense>
  );
}

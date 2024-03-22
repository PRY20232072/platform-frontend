import { CustomAutocomplete } from "@/components/ui/auto-complete";
import { Input } from "@nextui-org/react";
import { addressTypes, civilStatus, genders } from "@/data/data";
import React, { useState, useEffect } from "react";
import departments from "@/data/departments.json";
import provincesData from "@/data/provinces.json";
import districsData from "@/data/districts.json";

interface PatientDemographicFieldsProps {
  patient: any;
  isEditing: boolean;
  handleInputChange: (key: string, value: any) => void;
}

export default function PatientDemographicFields({
  patient,
  isEditing,
  handleInputChange,
}: PatientDemographicFieldsProps) {
  const [isInvalid, setIsInvalid] = useState(false);
  const validatePhone = (phone: string) => phone.match(/^9\d{8}$/);
  const [provincesOptions, setProvincesOptions] = useState<
    { id: string; name: string; department_id: string }[]
  >([]);
  const [districtsOptions, setDistrictsOptions] = useState<
    { id: string; name: string; province_id: string }[]
  >([]);

  useEffect(() => {
    setIsInvalid(patient.telephone ? !validatePhone(patient.telephone) : false);
  }, [patient.telephone]);

  useEffect(() => {
    if (patient.address.department) {
      const selectedDepartment = departments.find(
        (department) => department.name === patient.address.department
      );
      if (selectedDepartment) {
        const provinces = provincesData.filter(
          (province) => province.department_id === selectedDepartment.id
        );
        setProvincesOptions(provinces);
      }
    } else {
      patient.address.province = "";
      setProvincesOptions([]);
    }
  }, [patient.address.department]);

  useEffect(() => {
    if (patient.address.province) {
      const selectedProvince = provincesData.find(
        (province) => province.name === patient.address.province
      );

      if (selectedProvince) {
        const districts = districsData.filter(
          (district) => district.province_id === selectedProvince.id
        );
        setDistrictsOptions(districts);
      }
    } else {
      patient.address.district = "";
      setDistrictsOptions([]);
    }
  }, [patient.address.province]);

  return (
    <>
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
            value={patient.name_id}
            onChange={(e) => handleInputChange("name_id", e.target.value)}
          />
        </div>
        <CustomAutocomplete
          isDisabled={!isEditing}
          label='Gender'
          labelPlacement='outside'
          placeholder='Select an option'
          data={genders}
          inputValue={patient.gender}
          onInputChange={(value) => handleInputChange("gender", value)}
        />

        <div className='mb-4'>
          <Input
            isRequired
            isReadOnly={!isEditing}
            type='date'
            label='Birthdate'
            labelPlacement='outside'
            placeholder='Complete data'
            value={patient.birthDate}
            onChange={(e) => handleInputChange("birthDate", e.target.value)}
          />
        </div>
        <CustomAutocomplete
          isDisabled={!isEditing}
          label='Civil Status'
          labelPlacement='outside'
          placeholder='Select an option'
          data={civilStatus}
          inputValue={patient.maritalStatus}
          onInputChange={(value) => handleInputChange("maritalStatus", value)}
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
            value={patient.telephone}
            onChange={(e) => handleInputChange("telephone", e.target.value)}
            errorMessage={isInvalid && "Please enter a valid phone number"}
          />
        </div>
      </div>
      <div className='my-4 font-bold  text-2xl tracking-[0] leading-[24px]'>
        Address
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4'>
        <CustomAutocomplete
          isDisabled={!isEditing}
          label='Department'
          labelPlacement='outside'
          placeholder='Select a department'
          data={departments.map((department) => ({
            value: department.id,
            label: department.name,
          }))}
          inputValue={patient.address.department}
          onInputChange={(value) =>
            handleInputChange("address.department", value)
          }
        />

        <CustomAutocomplete
          isDisabled={!isEditing || !patient.address.department}
          label='Province'
          labelPlacement='outside'
          placeholder='Select a province'
          data={provincesOptions.map((provinces) => ({
            value: provinces.id,
            label: provinces.name,
          }))}
          inputValue={patient.address.province}
          onInputChange={(value) =>
            handleInputChange("address.province", value)
          }
        />

        <CustomAutocomplete
          isDisabled={!isEditing || !patient.address.province}
          label='District'
          labelPlacement='outside'
          placeholder='Select a district'
          data={districtsOptions.map((districts) => ({
            value: districts.id,
            label: districts.name,
          }))}
          inputValue={patient.address.district}
          onInputChange={(value) =>
            handleInputChange("address.district", value)
          }
        />

        <CustomAutocomplete
          isDisabled={!isEditing}
          label='Type of address'
          labelPlacement='outside'
          placeholder='Select an option'
          data={addressTypes}
          inputValue={patient.address.type_address}
          onInputChange={(value) =>
            handleInputChange("address.type_address", value)
          }
        />

        <Input
          isRequired
          isReadOnly={!isEditing}
          type='text'
          label='Address line'
          labelPlacement='outside'
          placeholder='Complete address line'
          value={patient.address.address_line}
          onChange={(e) =>
            handleInputChange("address.address_line", e.target.value)
          }
        />

        <Input
          isRequired
          isReadOnly={!isEditing}
          type='text'
          label='Postal code'
          labelPlacement='outside'
          placeholder='Complete postal code'
          value={patient.address.postal_code}
          onChange={(e) =>
            handleInputChange("address.postal_code", e.target.value)
          }
        />
      </div>
    </>
  );
}

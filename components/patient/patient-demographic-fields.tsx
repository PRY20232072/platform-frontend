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
        (department) => department.id === patient.address.department
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
        (province) => province.id === patient.address.province
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
        Información general
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <div className='mb-4'>
          <Input
            isRequired
            isReadOnly={!isEditing}
            type='text'
            label='Nombre completo'
            labelPlacement='outside'
            placeholder='Jhon Doe Smith'
            value={patient.name_id}
            onChange={(e) => handleInputChange("name_id", e.target.value)}
          />
        </div>
        <CustomAutocomplete
          isDisabled={!isEditing}
          label='Género'
          labelPlacement='outside'
          placeholder='Selecciona una opción'
          data={genders}
          selectedKey={patient.gender}
          onSelectionChange={(value) => handleInputChange("gender", value)}
        />

        <div className='mb-4'>
          <Input
            isRequired
            isReadOnly={!isEditing}
            type='date'
            label='Fecha de nacimiento'
            labelPlacement='outside'
            placeholder='Selecciona una fecha'
            value={patient.birthDate}
            onChange={(e) => handleInputChange("birthDate", e.target.value)}
          />
        </div>
        <CustomAutocomplete
          isDisabled={!isEditing}
          label='Estado civil'
          labelPlacement='outside'
          placeholder='Selecciona una opción'
          data={civilStatus}
          selectedKey={patient.maritalStatus}
          onSelectionChange={(value) =>
            handleInputChange("maritalStatus", value)
          }
        />

        <div className='flex-col items-start gap-[5px] relative !flex-1 !flex !grow'>
          <Input
            isRequired
            startContent={
              <span className='text-default-400 text-small'>+51</span>
            }
            isReadOnly={!isEditing}
            type='tel'
            label='Número de teléfono'
            labelPlacement='outside'
            placeholder='Completa el número de teléfono'
            isInvalid={isInvalid}
            color={isInvalid ? "danger" : "default"}
            value={patient.telephone}
            onChange={(e) => handleInputChange("telephone", e.target.value)}
            errorMessage={isInvalid && "Por favor, ingrese un número válido"}
          />
        </div>
      </div>
      <div className='my-4 font-bold  text-2xl tracking-[0] leading-[24px]'>
        Dirección de residencia
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4'>
        <CustomAutocomplete
          isDisabled={!isEditing}
          label='Departmento'
          labelPlacement='outside'
          placeholder='Selecciona un departamento'
          data={departments.map((department) => ({
            value: department.id,
            label: department.name,
          }))}
          selectedKey={patient.address.department}
          onSelectionChange={(value) =>
            handleInputChange("address.department", value)
          }
        />

        <CustomAutocomplete
          isDisabled={!isEditing || !patient.address.department}
          label='Provincia'
          labelPlacement='outside'
          placeholder='Selecciona una provincia'
          data={provincesOptions.map((provinces) => ({
            value: provinces.id,
            label: provinces.name,
          }))}
          selectedKey={patient.address.province}
          onSelectionChange={(value) =>
            handleInputChange("address.province", value)
          }
        />

        <CustomAutocomplete
          isDisabled={!isEditing || !patient.address.province}
          label='Distrito'
          labelPlacement='outside'
          placeholder='Selecciona un distrito'
          data={districtsOptions.map((districts) => ({
            value: districts.id,
            label: districts.name,
          }))}
          selectedKey={patient.address.district}
          onSelectionChange={(value) =>
            handleInputChange("address.district", value)
          }
        />

        <CustomAutocomplete
          isDisabled={!isEditing}
          label='Tipo de dirección'
          labelPlacement='outside'
          placeholder='Selecciona un tipo de dirección'
          data={addressTypes}
          selectedKey={patient.address.type_address}
          onSelectionChange={(value) =>
            handleInputChange("address.type_address", value)
          }
        />

        <Input
          isRequired
          isReadOnly={!isEditing}
          type='text'
          label='Dirección'
          labelPlacement='outside'
          placeholder='Completa la dirección'
          value={patient.address.address_line}
          onChange={(e) =>
            handleInputChange("address.address_line", e.target.value)
          }
        />

        <Input
          isRequired
          isReadOnly={!isEditing}
          type='text'
          label='Código postal'
          labelPlacement='outside'
          placeholder='Completa el código postal'
          value={patient.address.postal_code}
          onChange={(e) =>
            handleInputChange("address.postal_code", e.target.value)
          }
        />
      </div>
    </>
  );
}

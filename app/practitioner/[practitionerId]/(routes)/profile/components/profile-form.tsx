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
import speacilizationData from "@/data/especialization.json";
import practitionerService from "@/services/practitionerService";
import { CustomAutocomplete } from "@/components/ui/auto-complete";
import { Button, Input } from "@nextui-org/react";
import CustomSuspense from "@/components/custom-suspense";
import Loading from "@/components/loading";
import { toast } from "react-toastify";
import departments from "@/data/departments.json";
import provincesData from "@/data/provinces.json";
import districsData from "@/data/districts.json";
import AutocompleteLg from "@/components/ui/auto-complete-lg";

const especiality = speacilizationData as { id: string; name: string }[];

export default function PractitionerProfileForm() {
  const [isInvalid, setIsInvalid] = useState(false);
  const [isPCInvalid, setIsPCInvalid] = useState(false);
  const [isCMPInvalid, setIsCMPInvalid] = useState(false);
  const [isInvalidBirthdate, setIsInvalidBirthdate] = useState(false);

  const validatePhone = (phone: string) => phone.match(/^9\d{8}$/);
  const validatePostalCode = (postalCode: string) =>
    postalCode.match(/^\d{5}$/);
  const validateCMPCode = (cmpCode: string) => cmpCode.match(/^\d{6}$/);
  const validateBirthdate = (birthdate: string) => {
    const today = new Date();
    const birthdateDate = new Date(birthdate);
    let age = today.getFullYear() - birthdateDate.getFullYear();
    const month = today.getMonth() - birthdateDate.getMonth();
    if (
      month < 0 ||
      (month === 0 && today.getDate() < birthdateDate.getDate())
    ) {
      age--;
    }
    return age >= 18;
  };
  const [practitioner, setPractitioner] = useState(emptyPractitioner);
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
    setIsPCInvalid(
      practitioner.address.postal_code
        ? !validatePostalCode(practitioner.address.postal_code)
        : false
    );
    setIsCMPInvalid(
      practitioner.cmpCode ? !validateCMPCode(practitioner.cmpCode) : false
    );
    setIsInvalidBirthdate(
      practitioner.birthDate
        ? !validateBirthdate(practitioner.birthDate)
        : false
    );
  }, [
    practitioner.telephone,
    practitioner.cmpCode,
    practitioner.birthDate,
    practitioner.address.postal_code,
  ]);

  useEffect(() => {
    if (practitioner.address.department) {
      const selectedDepartment = departments.find(
        (department) => department.id === practitioner.address.department
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
        (province) => province.id === practitioner.address.province
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
      setPractitioner(getPractitionerByIdResponse.data);
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
      toast.error("Número de telefono inválido", {
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

    toast.info("Información actualizada", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    location.reload();
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
                  placeholder='Ingresa tu nombres'
                  value={practitioner.name_id}
                  onChange={(e) => {
                    setPractitioner({
                      ...practitioner,
                      name_id: e.target.value,
                    });
                  }}
                  errorMessage={
                    !practitioner.name_id ? "Ingrese su nombre completo" : ""
                  }
                />
              </div>
              <div className='mb-4'>
                <Input
                  isRequired
                  isReadOnly={!isEditing}
                  type='text'
                  label='Apellidos completos'
                  labelPlacement='outside'
                  placeholder='Ingresa tus apellidos'
                  value={practitioner.last_name}
                  onChange={(e) => {
                    setPractitioner({
                      ...practitioner,
                      last_name: e.target.value,
                    });
                  }}
                  errorMessage={
                    !practitioner.last_name ? "Ingrese sus apellidos" : ""
                  }
                />
              </div>
              <Input
                isRequired
                isReadOnly={!isEditing}
                isInvalid={isCMPInvalid}
                color={isCMPInvalid ? "danger" : "default"}
                type='text'
                label='Código Colegio Médico del Perú (CMP)'
                labelPlacement='outside'
                placeholder='Ingrese su código CMP'
                value={practitioner.cmpCode}
                onChange={(e) => {
                  setPractitioner({
                    ...practitioner,
                    cmpCode: e.target.value,
                  });
                }}
                errorMessage={
                  !practitioner.cmpCode
                    ? "Ingrese su código del colegio médico del Perú"
                    : isCMPInvalid && "Por favor, ingrese un CMP válido!"
                }
                maxLength={6}
              />
              <CustomAutocomplete
                isDisabled={!isEditing}
                label='Especialidad'
                labelPlacement='outside'              
                placeholder='Seleccione su especialidad '
                data={especiality.map((especiality) => ({
                  value: especiality.id,
                  label: especiality.name,
                }))}
                selectedKey={practitioner.speciality}
                onSelectionChange={(value) =>
                  setPractitioner({ ...practitioner, speciality: value })
                }
              />
              <CustomAutocomplete
                isDisabled={!isEditing}
                label='Género'
                labelPlacement='outside'
                placeholder='Escoge una opción'
                data={genders}
                selectedKey={practitioner.gender}
                onSelectionChange={(value) => {
                  setPractitioner({ ...practitioner, gender: value });
                }}
              />

              <div className='mb-4'>
                <Input
                  isRequired
                  isReadOnly={!isEditing}
                  type='date'
                  label='Fecha de nacimiento'
                  labelPlacement='outside'
                  placeholder='Selecciona una fecha'
                  value={practitioner.birthDate}
                  onChange={(e) => {
                    setPractitioner({
                      ...practitioner,
                      birthDate: e.target.value,
                    });
                  }}
                  isInvalid={isInvalidBirthdate}
                  color={isInvalidBirthdate ? "danger" : "default"}
                  max='2024-01-01'
                  errorMessage={
                    !practitioner.birthDate
                      ? "Ingrese su fecha de nacimiento"
                      : isInvalidBirthdate && "Debe ser mayor de 18 años"
                  }
                />
              </div>

              <CustomAutocomplete
                isDisabled={!isEditing}
                label='Estado civil'
                labelPlacement='outside'
                placeholder='Escoge una opción'
                data={civilStatus}
                selectedKey={practitioner.maritalStatus}
                onSelectionChange={(value) => {
                  setPractitioner({ ...practitioner, maritalStatus: value });
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
                  label='Número de teléfono	'
                  labelPlacement='outside'
                  placeholder='Complete el número de teléfono'
                  isInvalid={isInvalid}
                  color={isInvalid ? "danger" : "default"}
                  value={practitioner.telephone}
                  onChange={(e) => {
                    setPractitioner({
                      ...practitioner,
                      telephone: e.target.value,
                    });
                  }}
                  errorMessage={
                    !practitioner.telephone
                      ? "Ingrese su número de teléfono"
                      : isInvalid && "Por favor, ingrese un número válido"
                  }
                  maxLength={9}
                />
              </div>
            </div>
          </div>
          <div className='mb-8'>
            <div className='mb-4 font-bold  text-2xl tracking-[0] leading-[24px]'>
              Dirección de residencia
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <CustomAutocomplete
                isDisabled={!isEditing}
                label='Departamento'
                labelPlacement='outside'
                placeholder='Selecciona un departamento'
                data={departments.map((department) => ({
                  value: department.id,
                  label: department.name,
                }))}
                selectedKey={practitioner.address.department}
                onSelectionChange={(value) => {
                  setPractitioner({
                    ...practitioner,
                    address: { ...practitioner.address, department: value },
                  });
                }}
              />
              <CustomAutocomplete
                isDisabled={!isEditing || !practitioner.address.department}
                label='Provincia'
                labelPlacement='outside'
                placeholder='Escoge una provincia'
                data={provincesOptions.map((provinces) => ({
                  value: provinces.id,
                  label: provinces.name,
                }))}
                selectedKey={practitioner.address.province}
                onSelectionChange={(value) => {
                  setPractitioner({
                    ...practitioner,
                    address: { ...practitioner.address, province: value },
                  });
                }}
              />
              <CustomAutocomplete
                isDisabled={!isEditing || !practitioner.address.province}
                label='Distrito'
                labelPlacement='outside'
                placeholder='Escoge una distrito'
                data={districtsOptions.map((districts) => ({
                  value: districts.id,
                  label: districts.name,
                }))}
                selectedKey={practitioner.address.district}
                onSelectionChange={(value) => {
                  setPractitioner({
                    ...practitioner,
                    address: { ...practitioner.address, district: value },
                  });
                }}
              />
              <CustomAutocomplete
                isDisabled={!isEditing}
                label='Tipo de dirección'
                labelPlacement='outside'
                placeholder='Escoge una opción'
                data={addressTypes}
                selectedKey={practitioner.address.type_address}
                onSelectionChange={(value) => {
                  setPractitioner({
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
                  label='Dirección'
                  labelPlacement='outside'
                  placeholder='Complete la dirección'
                  value={practitioner.address.address_line}
                  onChange={(e) => {
                    setPractitioner({
                      ...practitioner,
                      address: {
                        ...practitioner.address,
                        address_line: e.target.value,
                      },
                    });
                  }}
                  errorMessage={
                    !practitioner.address.address_line
                      ? "Ingrese su dirección de residencia"
                      : ""
                  }
                />
              </div>

              <div className='inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]'>
                <Input
                  isReadOnly={!isEditing}
                  isInvalid={isPCInvalid}
                  color={isPCInvalid ? "danger" : "default"}
                  type='text'
                  label='Código Postal'
                  labelPlacement='outside'
                  placeholder='Completa el código postal'
                  value={practitioner.address.postal_code}
                  onChange={(e) => {
                    setPractitioner({
                      ...practitioner,
                      address: {
                        ...practitioner.address,
                        postal_code: e.target.value,
                      },
                    });
                  }}
                  errorMessage={
                    isPCInvalid && "Por favor, ingrese un código postal válido!"
                  }
                  maxLength={5}
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
                  setPractitioner(getPractitionerByIdResponse.data);
                }}
              >
                Cancelar
              </Button>
              <Button
                className='text-white font-medium leading-6 whitespace-nowrap justify-center items-center bg-amber-500 self-center w-[77px] max-w-full mt-2 ml-4 px-4 py-3 rounded-xl'
                type='submit'
              >
                Guardar
              </Button>
            </>
          ) : (
            <Button
              className='text-white font-medium leading-6 whitespace-nowrap justify-center items-center bg-blue-600 self-center w-[77px] max-w-full mt-2 px-4 py-3 rounded-xl'
              onClick={() => {
                setIsEditing(!isEditing);
              }}
            >
              Editar
            </Button>
          )}
        </div>
      </form>
    </CustomSuspense>
  );
}

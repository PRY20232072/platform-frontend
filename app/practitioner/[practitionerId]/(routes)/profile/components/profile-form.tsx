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
import { PractitionerSchema } from "@/types/practitioner";

export default function PractitionerProfileForm() {
  const [isInvalid, setIsInvalid] = useState(false);
  const validatePhone = (phone: string) => phone.match(/^9\d{8}$/);
  const [practitioner, setPractitioner] = useState(emptyPractitioner);
  const [provincesOptions, setProvincesOptions] = useState<
    { id: string; name: string; department_id: string }[]
  >([]);
  const [districtsOptions, setDistrictsOptions] = useState<
    { id: string; name: string; province_id: string }[]
  >([]);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    setIsInvalid(
      practitioner.telephone ? !validatePhone(practitioner.telephone) : false
    );
  }, [practitioner.telephone]);

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

    const practitionerParsed = PractitionerSchema.safeParse(practitioner);
    if (practitionerParsed.error) {
      setErrors(practitionerParsed.error.format());
      return;
    } else {
      setErrors({});
    }

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

    //show toast
    toast.info("Información actualizada", {
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
        <div className="w-full max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="mb-4 font-bold text-2xl tracking-[0] leading-[24px]">
              Información general
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="mb-4">
                <Input
                  isReadOnly={!isEditing}
                  type="text"
                  label="Nombre completo"
                  labelPlacement="outside"
                  placeholder="Ingresa el nombre completo"
                  value={practitioner.name_id}
                  onChange={(e) => {
                    setPractitioner({
                      ...practitioner,
                      name_id: e.target.value,
                    });
                  }}
                  errorMessage={
                    errors.name_id && errors.name_id._errors.join(", ")
                  }
                />
              </div>
              <CustomAutocomplete
                isDisabled={!isEditing}
                label="Género"
                labelPlacement="outside"
                placeholder="Escoge una opción"
                data={genders}
                selectedKey={practitioner.gender}
                onSelectionChange={(value) => {
                  setPractitioner({ ...practitioner, gender: value });
                }}
                errorMessage={errors.gender && errors.gender._errors.join(", ")}
              />

              <div className="mb-4">
                <Input
                  isReadOnly={!isEditing}
                  type="date"
                  label="Fecha de cumpleaños"
                  labelPlacement="outside"
                  placeholder="Ingresa la fecha de cumpleaños"
                  value={practitioner.birthDate}
                  onChange={(e) => {
                    setPractitioner({
                      ...practitioner,
                      birthDate: e.target.value,
                    });
                  }}
                  errorMessage={
                    errors.birthDate && errors.birthDate._errors.join(", ")
                  }
                />
              </div>

              <CustomAutocomplete
                isDisabled={!isEditing}
                label="Estado civil"
                labelPlacement="outside"
                placeholder="Escoge una opción"
                data={civilStatus}
                selectedKey={practitioner.maritalStatus}
                onSelectionChange={(value) => {
                  setPractitioner({ ...practitioner, maritalStatus: value });
                }}
                errorMessage={
                  errors.maritalStatus &&
                  errors.maritalStatus._errors.join(", ")
                }
              />

              <div className="flex-col items-start gap-[5px] relative !flex-1 !flex !grow">
                <Input
                  startContent={
                    <span className="text-default-400 text-small">+51</span>
                  }
                  isReadOnly={!isEditing}
                  type="tel"
                  label="Número de teléfono	"
                  labelPlacement="outside"
                  placeholder="Complete el número de teléfono"
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
                    errors.telephone && errors.telephone._errors.join(", ")
                  }
                />
              </div>
            </div>
          </div>
          <div className="mb-8">
            <div className="mb-4 font-bold  text-2xl tracking-[0] leading-[24px]">
              Dirección de residencia
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CustomAutocomplete
                isDisabled={!isEditing}
                label="Departamento"
                labelPlacement="outside"
                placeholder="Selecciona un departamento"
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
                errorMessage={
                  errors.address &&
                  errors.address.department &&
                  errors.address.department._errors.join(", ")
                }
              />
              <CustomAutocomplete
                isDisabled={!isEditing || !practitioner.address.department}
                label="Provincia"
                labelPlacement="outside"
                placeholder="Escoge una provincia"
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
                errorMessage={
                  errors.address &&
                  errors.address.province &&
                  errors.address.province._errors.join(", ")
                }
              />
              <CustomAutocomplete
                isDisabled={!isEditing || !practitioner.address.province}
                label="Distrito"
                labelPlacement="outside"
                placeholder="Escoge una distrito"
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
                errorMessage={
                  errors.address &&
                  errors.address.district &&
                  errors.address.district._errors.join(", ")
                }
              />
              <CustomAutocomplete
                isDisabled={!isEditing}
                label="Tipo de dirección"
                labelPlacement="outside"
                placeholder="Escoge una opción"
                data={addressTypes}
                selectedKey={practitioner.address.type_address}
                onSelectionChange={(value) => {
                  setPractitioner({
                    ...practitioner,
                    address: { ...practitioner.address, type_address: value },
                  });
                }}
                errorMessage={
                  errors.address &&
                  errors.address.type_address &&
                  errors.address.type_address._errors.join(", ")
                }
              />
              <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
                <Input
                  isReadOnly={!isEditing}
                  type="text"
                  label="Dirección"
                  labelPlacement="outside"
                  placeholder="Complete la dirección"
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
                    errors.address &&
                    errors.address.address_line &&
                    errors.address.address_line._errors.join(", ")
                  }
                />
              </div>

              <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
                <Input
                  isReadOnly={!isEditing}
                  type="text"
                  label="Código Postal"
                  labelPlacement="outside"
                  placeholder="Completa el código postal"
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
                    errors.address &&
                    errors.address.postal_code &&
                    errors.address.postal_code._errors.join(", ")
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          {isEditing ? (
            <>
              <Button
                className="text-red-600 font-medium leading-6 whitespace-nowrap justify-center items-center bg-red-300 self-center w-[77px] max-w-full mt-2 px-4 py-3 rounded-xl"
                onClick={() => {
                  setIsEditing(!isEditing);
                }}
              >
                Cancelar
              </Button>
              <Button
                className="text-white font-medium leading-6 whitespace-nowrap justify-center items-center bg-amber-500 self-center w-[77px] max-w-full mt-2 ml-4 px-4 py-3 rounded-xl"
                type="submit"
              >
                Guardar
              </Button>
            </>
          ) : (
            <Button
              className="text-white font-medium leading-6 whitespace-nowrap justify-center items-center bg-blue-600 self-center w-[77px] max-w-full mt-2 px-4 py-3 rounded-xl"
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

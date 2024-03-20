"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { emptyPatient } from "@/data/data";
import { Button } from "@nextui-org/react";
import CustomSuspense from "@/components/custom-suspense";
import Loading from "@/components/loading";
import { toast } from "react-toastify";
import patientService from "@/services/patientService";
import { PatientDemographicFields } from "@/components/patient/patient-demographic-fields";

export default function PatientDemographicForm() {
  const [patient, setPatient] = useState(emptyPatient);
  const [isRegisterPatient, setIsRegisterPatient] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { response: getPatientByIdResponse, fetchData: getPatientById } =
    useApi();
  const { response: updatePatientResponse, fetchData: updatePatient } =
    useApi();
  const { response: createPatientResponse, fetchData: createPatient } =
    useApi();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        await getPatientById(
          patientService.getPatientById(session?.user?.id as string)
        );
      }
    };

    fetchData();
  }, [session?.user?.id]);

  useEffect(() => {
    if (getPatientByIdResponse.isSuccess) {
      setPatient(getPatientByIdResponse.data);
      setIsRegisterPatient(true);
    } else {
      setIsRegisterPatient(false);
    }
  }, [getPatientByIdResponse]);

  useEffect(() => {
    if (updatePatientResponse.isSuccess || createPatientResponse.isSuccess) {
      getPatientById(
        patientService.getPatientById(session?.user?.id as string)
      );
    }
  }, [updatePatientResponse, createPatientResponse]);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isRegisterPatient) {
      await updatePatient(
        patientService.updatePatient(session?.user?.id as string, patient)
      );
    } else {
      await createPatient(
        patientService.createPatient(session?.user?.id as string, patient)
      );
    }
    setIsEditing(!isEditing);

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

  const handleInputChange = (key: string, value: any) => {
    if (key.includes('address')) {
      const [prop, field] = key.split('.');
      setPatient((prevState: any) => ({
        ...prevState,
        [prop]: {
          ...prevState[prop],
          [field]: value
        }
      }));
    } else {
      setPatient((prevState: any) => ({
        ...prevState,
        [key]: value
      }));
    }
  };

  return (
    <CustomSuspense
      isLoading={getPatientByIdResponse.isLoading}
      fallback={<Loading />}
    >
      <form onSubmit={handleEdit}>
        <PatientDemographicFields
          patient={patient}
          isEditing={isEditing}
          handleInputChange={handleInputChange}
        />
        <div className="flex justify-center">
          {isEditing ? (
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
                type="submit"
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
          )}
        </div>
      </form>
    </CustomSuspense>
  );
}

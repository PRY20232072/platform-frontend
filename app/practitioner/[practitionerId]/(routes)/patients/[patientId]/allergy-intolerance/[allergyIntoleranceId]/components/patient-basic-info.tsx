"use client";

import React, { useEffect, useState } from "react";
import { emptyPatient } from "@/data/data";
import { useParams } from "next/navigation";
import patientService from "@/services/patientService";
import { useApi } from "@/hooks/useApi";
import CustomSuspense from "@/components/custom-suspense";
import Loading from "@/components/loading";

export default function PatientBasicInfo() {
  const [patient, setPatient] = useState(emptyPatient);
  const { response: patientResponse, fetchData: getPatient } = useApi();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (params.patientId) {
        await getPatient(
          patientService.getPatientById(params.patientId as string)
        );
      }
    };

    fetchData();
  }, [params.patientId]);

  useEffect(() => {
    if (patientResponse.isSuccess) {
      setPatient(patientResponse.data);
    }
  }, [patientResponse.isSuccess]);

  return (
    <CustomSuspense
      isLoading={patientResponse.isLoading}
      fallback={<Loading />}
    >
      <div className="justify-between items-center border-b border-gray-200 flex w-full max-w-[1100px] gap-5 mt-1 max-md:max-w-full max-md:flex-wrap">
        <div className="flex grow basis-[0%] flex-col items-stretch my-auto max-md:max-w-full">
          <div className="text-4xl font-bold leading-10 max-md:max-w-full">
            Detalles de la alergia
          </div>
          <div className="justify-center text-neutral-400 text-2xl leading-10 max-md:max-w-full">
            {patient.name_id}
          </div>
          <div className="justify-center text-neutral-400 text-base leading-10 max-md:max-w-full">
            ID: {patient.patient_id}
          </div>
        </div>
      </div>
    </CustomSuspense>
  );
}

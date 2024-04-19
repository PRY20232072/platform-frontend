"use client";

import { User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import { emptyPatient } from "@/data/data";
import CustomSuspense from "@/components/custom-suspense";
import patientService from "@/services/patientService";
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
  }, [params?.patientId]);

  useEffect(() => {
    if (patientResponse.isSuccess) {
      setPatient(patientResponse.data);
    }
  }, [patientResponse?.isSuccess]);

  return (
    <CustomSuspense
      isLoading={patientResponse.isLoading}
      fallback={<Loading />}
    >
     <div className='flex flex-wrap justify-between items-center border-b border-gray-200 w-full max-w-[1100px] mt-1 mx-auto md:flex-nowrap'>
        <div className='flex flex-grow flex-col items-center p-4 text-center md:items-stretch md:text-left'>
          <h2 className='text-4xl font-bold leading-10 mb-2'>Detalles del paciente</h2>
          <p className='text-neutral-400 text-xl md:text-2xl leading-10'>
            {patient.name_id}
          </p>
          <p className='text-neutral-400 text-base leading-10'>
            ID: {patient.patient_id}
          </p>
        </div>
        <div className='relative w-full max-w-[116px] h-[115.5px] md:block hidden'>
          <div
            className='w-full h-full flex justify-center items-center bg-blue-600 rounded-2xl'
            style={{ padding: "6px" }}
            aria-label='Pill'
          >
            <User2 className='w-12 h-12 text-white' color='white' />
          </div>
        </div>
      </div>
    </CustomSuspense>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import { Card, CardBody } from "@nextui-org/react";
import { emptyPatient } from "@/data/data";
import CustomSuspense from "@/components/custom-suspense";
import patientService from "@/services/patientService";
import FormSkeleton from "@/components/ui/skeletons/form-skeleton";
import PatientDemographicFields from "@/components/patient/patient-demographic-fields";

export default function PatientDemographicInformation() {
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
      fallback={<FormSkeleton />}
    >
      <Card>
        <CardBody className="items-stretch self-stretch shadow  flex flex-col mt-2.5 p-5 rounded-2xl max-md:max-w-full">
          <PatientDemographicFields
            patient={patient}
            isEditing={false}
            handleInputChange={() => {}}
            errors={{}}
          />
        </CardBody>
      </Card>
    </CustomSuspense>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import allergyIntoleranceService from "@/services/allergyIntoleranceService";
import AllergyDetailFields from "@/components/allergy/allergy-detail-fields";
import CustomSuspense from "@/components/custom-suspense";
import Loading from "@/components/loading";
import notificationsService from "@/services/notificationsService";

export default function PatientAllergyDetail() {
  const [allergy, setAllergy] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);
  const { response: allergyResponse, fetchData: getAllergy } = useApi();
  const { response: updateAllergyResponse, fetchData: updateAllergy } =
    useApi();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (params.patientId && params.allergyIntoleranceId) {
        await getAllergy(
          allergyIntoleranceService.getAllergyByIdPatientId(
            params.allergyIntoleranceId as string,
            params.patientId as string
          )
        );
      }
    };

    fetchData();
  }, [params.allergyIntoleranceId]);

  useEffect(() => {
    if (allergyResponse.isSuccess) {
      setAllergy(allergyResponse.data);
    }
  }, [allergyResponse.isSuccess]);

  useEffect(() => {
    if (
      updateAllergyResponse.isSuccess &&
      params.patientId &&
      params.allergyIntoleranceId
    ) {
      getAllergy(
        allergyIntoleranceService.getAllergyByIdPatientId(
          params.allergyIntoleranceId as string,
          params.patientId as string
        )
      );
    }
  }, [updateAllergyResponse.isSuccess]);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateAllergy(
      allergyIntoleranceService.updateAllergy(
        allergy.allergy_id,
        allergy,
        params.practitionerId as string
      )
    );

    notificationsService.createNotifications({
      user_id: params.patientId,
      practitioner_id: params.practitionerId,
      register_id: allergy.allergy_id,
      register_type: "ALLERGY",
      type: "WRITE",
    });

    setIsEditing(!isEditing);
  };

  const handleInputChange = (key: string, value: any) => {
    setAllergy({ ...allergy, [key]: value });
  };

  return (
    <CustomSuspense
      isLoading={allergyResponse.isLoading}
      fallback={<Loading />}
    >
      <Card>
        <CardBody className="items-stretch self-stretch shadow  flex flex-col mt-2.5 p-5 rounded-2xl max-md:max-w-full">
          <form className="max-md:max-w-full" onSubmit={handleEdit}>
            {allergy && (
              <AllergyDetailFields
                allergy={allergy}
                isEditing={isEditing}
                handleInputChange={handleInputChange}
              />
            )}
            <div className="flex justify-center mt-4">
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
        </CardBody>
      </Card>
    </CustomSuspense>
  );
}

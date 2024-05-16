"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import familyRecordService from "@/services/familyRecordService";
import CustomSuspense from "@/components/custom-suspense";
import Loading from "@/components/loading";
import FamilyRecordDetailFields from "@/components/family-records/family-record-detail-fields";
import notificationsService from "@/services/notificationsService";

export default function PatientFamilyRecordDetail() {
  const [family_record, setFamilyRecord] = useState<any>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { response: familyRecordResponse, fetchData: getFamilyRecord } =
    useApi();
  const {
    response: updateFamilyRecordResponse,
    fetchData: updateFamilyRecord,
  } = useApi();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (params.familyRecordId && params.patientId) {
        await getFamilyRecord(
          familyRecordService.getFamilyRecordByIdPatientId(
            params.familyRecordId as string,
            params.patientId as string
          )
        );
      }
    };

    fetchData();
  }, [params.familyRecordId, params.patientId]);

  useEffect(() => {
    if (familyRecordResponse.isSuccess) {
      setFamilyRecord(familyRecordResponse.data);
    }
  }, [familyRecordResponse.isSuccess]);

  useEffect(() => {
    if (
      updateFamilyRecordResponse.isSuccess &&
      params.familyRecordId &&
      params.patientId
    ) {
      getFamilyRecord(
        familyRecordService.getFamilyRecordByIdPatientId(
          params.familyRecordId as string,
          params.patientId as string
        )
      );
    }
  }, [updateFamilyRecordResponse.isSuccess]);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateFamilyRecord(
      familyRecordService.updateFamilyRecord(
        family_record.familyHistory_id,
        family_record,
        params.practitionerId as string
      )
    );

    notificationsService.createNotifications({
      user_id: params.patientId,
      practitioner_id: params.practitionerId,
      register_id: family_record.familyHistory_id,
      register_type: "FAMILY_HISTORY",
      type: "WRITE",
    });

    setIsEditing(!isEditing);
  };

  const handleInputChange = (key: string, value: any) => {
    setFamilyRecord({ ...family_record, [key]: value });
  };

  return (
    <CustomSuspense
      isLoading={familyRecordResponse.isLoading}
      fallback={<Loading />}
    >
      <Card>
        <CardBody className="items-stretch self-stretch shadow  flex flex-col mt-2.5 p-5 rounded-2xl max-md:max-w-full">
          {family_record && (
            <form onSubmit={handleEdit}>
              <FamilyRecordDetailFields
                isEditing={isEditing}
                familyRecord={family_record}
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
          )}
        </CardBody>
      </Card>
    </CustomSuspense>
  );
}

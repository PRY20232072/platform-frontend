"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Chip,
  ChipProps,
} from "@nextui-org/react";
import CustomSuspense from "@/components/custom-suspense";
import Loading from "@/components/loading";
import { selectedPatientAllergiesTableColumns } from "@/data/data";
import { useParams, useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import allergyIntoleranceService from "@/services/allergyIntoleranceService";
import notificationsService from "@/services/notificationsService";

const statusColorMap: Record<string, ChipProps["color"]> = {
  RESOLVED: "success",
  ACTIVE: "danger",
  INACTIVE: "warning",
};

const statusMap: Record<string, string> = {
  RESOLVED: "RESUELTO",
  ACTIVE: "ACTIVO",
  INACTIVE: "INACTIVO",
};

const alleryTypesMap: Record<string, string> = {
  ALLERGY: "ALERGIA",
  INTOLERANCE: "INTOLERANCIA",
};

const allergyCategories: Record<string, string> = {
  FOOD: "ALIMENTO",
  MEDICATION: "MEDICAMENTO",
  ENVIRONMENT: "AMBIENTE",
  BIOLOGIC: "BIOLOGICO",
  OTHER: "OTRO",
};

type Allergy = {
  patient_id: string;
  participant_id: string;
  type: string;
  category: string;
  criticality: string;
  severity: string;
  clinical_status: string;
  verification_status: string;
  onset_date: string;
  recorded_date: string;
  last_occurrence: string;
  allergy_notes: string;
  allergy_id: string;
  has_access: string;
};

export const PatientAllergiesTable = () => {
  const [allergyList, setAllergyList] = useState<Allergy[]>([]);
  const { response: getAllergyListResponse, fetchData: getAllergyList } =
    useApi();
  const params = useParams();
  const router = useRouter();
  useEffect(() => {
    getAllergyList(
      allergyIntoleranceService.getAllergyListByPatientId(
        params.patientId as string
      )
    );
  }, [params.patientId]);

  useEffect(() => {
    if (getAllergyListResponse.isSuccess) {
      setAllergyList(getAllergyListResponse.data);
    }
  }, [getAllergyListResponse.isSuccess]);

  const renderCell = React.useCallback(
    (selected_patient_allergy: Allergy, columnKey: React.Key) => {
      const cellValue = selected_patient_allergy[columnKey as keyof Allergy];

      switch (columnKey) {
        case "category":
          return allergyCategories[cellValue];
        case "type":
          return alleryTypesMap[cellValue];
        case "clinical_status":
          return (
            <Chip
              color={statusColorMap[selected_patient_allergy.clinical_status]}
              size='sm'
              variant='flat'
            >
              {statusMap[cellValue]}
            </Chip>
          );
        case "actions":
          return (
            <div className='relative flex justify-start items-start gap-2'>
              <Button
                className='font-medium '
                color='primary'
                radius='sm'
                size='sm'
                variant='flat'
                onClick={() => {
                  notificationsService.createNotifications({
                    user_id: params.patientId,
                    practitioner_id: params.practitionerId,
                    register_id: selected_patient_allergy.allergy_id,
                    register_type: "ALLERGY",
                    type: "READ",
                  });

                  router.push(
                    `/practitioner/${params.practitionerId}/patients/${params.patientId}/allergy-intolerance/${selected_patient_allergy.allergy_id}`
                  );
                }}
              >
                Ver más
              </Button>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <>
      <CustomSuspense
        isLoading={getAllergyListResponse.isLoading}
        fallback={<Loading />}
      >
        <Table aria-label='Patient allergy collection table'>
          <TableHeader columns={selectedPatientAllergiesTableColumns}>
            {(column) => (
              <TableColumn
                className='text-bold'
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent={"No hay registros de alergias disponibles."}
            items={(allergyList || []) as Allergy[]}
          >
            {(item) => (
              <TableRow key={item.allergy_id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CustomSuspense>
    </>
  );
};

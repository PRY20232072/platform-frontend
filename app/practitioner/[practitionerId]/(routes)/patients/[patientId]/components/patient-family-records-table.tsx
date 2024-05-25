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
} from "@nextui-org/react";

import {
  familyRecordStatusMap,
  familyStatusColorMap,
  practitionerFamilyRecordsTableColumns,
  relationshipMap,
} from "@/data/data";
import { useParams, useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import familyRecordService from "@/services/familyRecordService";
import notificationsService from "@/services/notificationsService";
import CustomSuspense from "@/components/custom-suspense";
import Loading from "@/components/loading";

type FamilyRecord = {
  patient_id: string;
  participant_id: string;
  clinical_status: string;
  onset_date: string;
  recorded_date: string;
  notes: string;
  familyHistory_id: string;
  contition: string;
  relationship: string;
  has_access: string;
  // family_name: string;
  // family_gender: string;
  // family_birthdate: string;
  // family_record_id: string;
};

export const PatientFamilyRecordsTable = () => {
  const [familyRecordList, setfamilyRecordList] = useState<FamilyRecord[]>();

  const {
    response: getFamilyRecordListResponse,
    fetchData: getFamilyRecordList,
  } = useApi();

  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (params.patientId) {
        await getFamilyRecordList(
          familyRecordService.getFamilyRecordByPatientId(
            params.patientId as string
          )
        );
      }
    };

    fetchData();
  }, [params.patientId]);

  useEffect(() => {
    if (getFamilyRecordListResponse.isSuccess) {
      setfamilyRecordList(getFamilyRecordListResponse.data);
    }
  }, [getFamilyRecordListResponse.isSuccess]);

  const renderCell = React.useCallback(
    (selected_patient_family_record: FamilyRecord, columnKey: React.Key) => {
      const cellValue =
        selected_patient_family_record[columnKey as keyof FamilyRecord];

      switch (columnKey) {
        case "relationship":
          return relationshipMap[cellValue];
        case "clinical_status":
          return (
            <Chip
              color={
                familyStatusColorMap[
                  selected_patient_family_record.clinical_status
                ]
              }
              size='sm'
              variant='flat'
            >
              {familyRecordStatusMap[cellValue]}
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
                    register_id:
                      selected_patient_family_record.familyHistory_id,
                    register_type: "FAMILY_HISTORY",
                    type: "READ",
                  });

                  router.push(
                    `/practitioner/${params.practitionerId}/patients/${params.patientId}/family-records/${selected_patient_family_record.familyHistory_id}`
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
        isLoading={getFamilyRecordListResponse.isLoading}
        fallback={<Loading />}
      >
        <Table aria-label='Patient family record collection table'>
          <TableHeader columns={practitionerFamilyRecordsTableColumns}>
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
            emptyContent={
              "No se encontraron registros en el historial familiar."
            }
            items={(familyRecordList || []) as FamilyRecord[]}
          >
            {(item) => (
              <TableRow key={item.familyHistory_id}>
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

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

import { practitionerFamilyRecordsTableColumns } from "@/data/data";
import { useParams, useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import familyRecordService from "@/services/familyRecordService";
import consentService from "@/services/consentService";

const statusColorMap: Record<string, ChipProps["color"]> = {
  RESOLVE: "success",
  ACTIVE: "danger",
  INNACTIVE: "warning",
};

type FamilyRecord = {
  patient_id: string;
  participant_id: string;
  reason: string;
  clinical_status: string;
  onset_date: string;
  recorded_date: string;
  notes: string;
  familyHistory_id: string;
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
  const { response: createConsentResponse, fetchData: createConsent } =
    useApi();

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
      parseFamilyRecordList(getFamilyRecordListResponse.data);
    }
  }, [getFamilyRecordListResponse.isSuccess]);

  const parseFamilyRecordList = async (familyRecordList: any) => {
    const parsedFamilyRecordList = await Promise.all(
      familyRecordList.map(async (family_record: any) => {
        try {
          const response =
            await consentService.getByRegisteryIdAndPractitionerId(
              family_record.familyHistory_id,
              params.practitionerId as string
            );
          const consent = response.data.data;
          family_record.has_access = consent.state;
          return family_record;
        } catch (error) {
          family_record.has_access = "NO";
          return family_record;
        }
      })
    );
    setfamilyRecordList(parsedFamilyRecordList);
  };

  const handleCreateConsent = async (familyRecordId: string) => {
    await createConsent(
      consentService.createConsent({
        register_id: familyRecordId,
        practitioner_id: params.practitionerId,
        register_type: "FAMILY_HISTORY",
      })
    );

    await getFamilyRecordList(
      familyRecordService.getFamilyRecordByPatientId(params.patientId as string)
    );
    router.refresh();
  };

  const renderCell = React.useCallback(
    (selected_patient_family_record: FamilyRecord, columnKey: React.Key) => {
      const cellValue =
        selected_patient_family_record[columnKey as keyof FamilyRecord];

      switch (columnKey) {
        case "clinical_status":
          return (
            <Chip
              color={
                statusColorMap[selected_patient_family_record.clinical_status]
              }
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "has_access":
          return selected_patient_family_record.has_access === "ACTIVE"
            ? "YES"
            : "NO";
        case "actions":
          return (
            <div className="relative flex justify-start items-start gap-2">
              {selected_patient_family_record.has_access === "ACTIVE" ? (
                <Button
                  className="font-medium "
                  color="primary"
                  radius="sm"
                  size="sm"
                  variant="flat"
                  onClick={() =>
                    router.push(
                      `${params.patientId}/family-records/${selected_patient_family_record.familyHistory_id}`
                    )
                  }
                >
                  View more
                </Button>
              ) : selected_patient_family_record.has_access === "PENDING" ? (
                <Button
                  isDisabled
                  className="font-medium "
                  color="secondary"
                  radius="sm"
                  size="sm"
                  variant="flat"
                >
                  Pending
                </Button>
              ) : (
                <Button
                  className="font-medium "
                  color="warning"
                  radius="sm"
                  size="sm"
                  variant="flat"
                  onClick={() =>
                    handleCreateConsent(
                      selected_patient_family_record.familyHistory_id
                    )
                  }
                >
                  Request Access
                </Button>
              )}
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
      <Table aria-label="Patient family record collection table">
        <TableHeader columns={practitionerFamilyRecordsTableColumns}>
          {(column) => (
            <TableColumn
              className="text-bold"
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No patient family record data available"}
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
    </>
  );
};

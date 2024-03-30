"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";

import { accessRequestTableColumns } from "@/data/data";
import consentService from "@/services/consentService";
import { useApi } from "@/hooks/useApi";
import practitionerService from "@/services/practitionerService";
import { useSession } from "next-auth/react";
import allergyIntoleranceService from "@/services/allergyIntoleranceService";
import { useParams } from "next/navigation";
import familyRecordService from "@/services/familyRecordService";

type HealthRecordAccess = {
  id: string;
  practitioner_name: string;
  practitioner_id: string;
  register_type: string;
  register_id: string;
};

const AccessRequestTable = () => {
  const { data: session } = useSession();
  const [items, setItems] = useState<HealthRecordAccess[]>([]);
  const { response: allergyRecordsResponse, fetchData: getAllergyRecords } =
    useApi();
  const { response: familyRecordsResponse, fetchData: getFamilyRecords } =
    useApi();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        await getAllergyRecords(
          allergyIntoleranceService.getAllergyListByPatientId(
            params.patientId as string
          )
        );
        await getFamilyRecords(
          familyRecordService.getFamilyRecordByPatientId(
            params.patientId as string
          )
        );
      }
    };

    fetchData();
  }, [session?.user?.id, params.patientId]);

  useEffect(() => {
    if (allergyRecordsResponse.isSuccess && familyRecordsResponse.isSuccess) {
      const healthRecordsList = allergyRecordsResponse.data.concat(
        familyRecordsResponse.data
      );
      getAllConsents(healthRecordsList);
    }
  }, [allergyRecordsResponse?.isSuccess, familyRecordsResponse?.isSuccess]);

  const getAllConsents = async (healthRecordsList: any) => {
    const consentList = await Promise.all(
      healthRecordsList.map(async (register: any) => {
        const registerId = register.allergy_id || register.familyHistory_id;
        const response = await consentService.getByRegisterId(registerId);
        return response.data.data;
      })
    );
    const flatArray = consentList.flat();
    parseConsentList(flatArray);
  };

  const parseConsentList = async (consentList: any) => {
    if (!Array.isArray(consentList)) return [];

    consentList = consentList.filter((consent) => consent.state !== "ACTIVE");

    if (consentList.length === 0) return;

    const parsedConsentList = await Promise.all(
      consentList.map(async (consent: any) => {
        try {
          const response = await practitionerService.getPractitionerById(
            consent.practitioner_id
          );
          const practitioner = response.data.data;
          return {
            id: consent.register_id + practitioner.practitioner_id,
            practitioner_name: practitioner.name_id,
            practitioner_id: practitioner.practitioner_id,
            register_id: consent.register_id,
            register_type: consent.register_type,
          } as HealthRecordAccess;
        } catch (error) {
          return {} as HealthRecordAccess;
        }
      })
    );
    setItems(parsedConsentList);
  };

  const handleApprove = async (consent: HealthRecordAccess) => {
    await consentService
      .approveConsent(consent.register_id, consent.practitioner_id)
      .then(() => {
        getAllergyRecords(
          allergyIntoleranceService.getAllergyListByPatientId(
            params.patientId as string
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRevoke = async (consent: HealthRecordAccess) => {
    await consentService
      .revokeConsent(consent.register_id, consent.practitioner_id)
      .then(() => {
        getAllergyRecords(
          allergyIntoleranceService.getAllergyListByPatientId(
            params.patientId as string
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderCell = useCallback(
    (practitioner_request: HealthRecordAccess, columnKey: React.Key) => {
      const cellValue =
        practitioner_request[columnKey as keyof HealthRecordAccess];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex justify-start items-start gap-2">
              <Button
                className="font-medium"
                color="primary"
                radius="sm"
                size="sm"
                variant="flat"
                onClick={() => handleApprove(practitioner_request)}
              >
                Approve
              </Button>
              <Button
                className="font-medium"
                color="danger"
                radius="sm"
                size="sm"
                variant="flat"
                onClick={() => handleRevoke(practitioner_request)}
              >
                Reject
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
      <div className="mb-4 font-bold text-2xl tracking-[0] leading-[24px]">
        Access Request
      </div>

      <Table aria-label="Practitioners request collection table">
        <TableHeader columns={accessRequestTableColumns}>
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
          emptyContent={"No practitioners request data available"}
          items={items}
        >
          {(item) => (
            <TableRow key={item.id}>
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

export { AccessRequestTable };

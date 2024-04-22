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

import { familyRecordAccessTableColumns } from "@/data/data";
import { useApi } from "@/hooks/useApi";
import consentService from "@/services/consentService";
import { useParams } from "next/navigation";
import CustomSuspense from "@/components/custom-suspense";
import Loading from "@/components/loading";

type FamilyRecordAccess = {
  id: string;
  practitioner_name: string;
  practitioner_id: string;
  register_id: string;
};

const FamilyRecordAccessClient = () => {
  const [items, setItems] = useState<FamilyRecordAccess[]>([]);
  const {
    response: getActiveConsentListResponse,
    fetchData: getActiveConsentList,
  } = useApi();
  const { response: revokeConsentResponse, fetchData: revokeConsent } =
    useApi();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (params.patientId) {
        await getActiveConsentList(
          consentService.getActiveConsentListByPatientId(
            params.patientId as string
          )
        );
      }
    };

    fetchData();
  }, [params.patientId]);

  useEffect(() => {
    if (
      !getActiveConsentListResponse.isLoading &&
      getActiveConsentListResponse.isSuccess &&
      params.familyRecordId
    ) {
      let activeConsentList =
        getActiveConsentListResponse.data as FamilyRecordAccess[];
      activeConsentList = activeConsentList.filter(
        (consent) => consent.register_id === params.familyRecordId
      );
      setItems(activeConsentList);
    }
  }, [getActiveConsentListResponse, params.familyRecordId]);

  useEffect(() => {
    if (
      !revokeConsentResponse.isLoading &&
      revokeConsentResponse.isSuccess &&
      params.patientId
    ) {
      getActiveConsentList(
        consentService.getActiveConsentListByPatientId(
          params.patientId as string
        )
      );
    }
  }, [revokeConsentResponse, params.patientId]);

  const handleRevoke = async (consent: FamilyRecordAccess) => {
    await revokeConsent(
      consentService.revokeConsent(consent.register_id, consent.practitioner_id)
    );
  };

  const renderCell = useCallback(
    (family_record_access: FamilyRecordAccess, columnKey: React.Key) => {
      const cellValue =
        family_record_access[columnKey as keyof FamilyRecordAccess];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex justify-start items-start gap-2">
              <Button
                className="font-medium "
                color="danger"
                radius="sm"
                size="sm"
                variant="flat"
                onClick={() => handleRevoke(family_record_access)}
              >
                Remove
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
        isLoading={getActiveConsentListResponse.isLoading}
        fallback={<Loading />}
      >
        <Table aria-label="Family Record Access collection table">
          <TableHeader columns={familyRecordAccessTableColumns}>
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
            emptyContent={"No hay acessos al registro"}
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
      </CustomSuspense>
    </>
  );
};

export { FamilyRecordAccessClient };

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

import { allergyAccessTableColumns } from "@/data/data";
import { useApi } from "@/hooks/useApi";
import consentService from "@/services/consentService";
import { useParams } from "next/navigation";
import CustomSuspense from "@/components/custom-suspense";
import Loading from "@/components/loading";

type AllergiesAccess = {
  id: string;
  practitioner_name: string;
  practitioner_id: string;
  register_id: string;
};

const AllergyAccessClient = () => {
  const [items, setItems] = useState<AllergiesAccess[]>([]);
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
      params.allergyIntoleranceId
    ) {
      let activeConsentList =
        getActiveConsentListResponse.data as AllergiesAccess[];
      activeConsentList = activeConsentList.filter(
        (consent) => consent.register_id === params.allergyIntoleranceId
      );
      setItems(activeConsentList);
    }
  }, [getActiveConsentListResponse, params.allergyIntoleranceId]);

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

  const handleRevoke = async (consent: AllergiesAccess) => {
    await revokeConsent(
      consentService.revokeConsent(consent.register_id, consent.practitioner_id)
    );
  };

  const renderCell = useCallback(
    (allergy_access: AllergiesAccess, columnKey: React.Key) => {
      const cellValue = allergy_access[columnKey as keyof AllergiesAccess];

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
                onClick={() => handleRevoke(allergy_access)}
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
        <Table aria-label="Allergies Access collection table">
          <TableHeader columns={allergyAccessTableColumns}>
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
            emptyContent={"No allergies access data available"}
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

export { AllergyAccessClient };

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
import { IResponse, useApi } from "@/hooks/useApi";
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

interface FamilyRecordAccessTableProps {
  items: FamilyRecordAccess[];
  handleRevoke: (family_record_access: FamilyRecordAccess) => void;
  getActiveConsentListResponse: IResponse;
}

const FamilyRecordAccessTable = ({
  items,
  handleRevoke,
  getActiveConsentListResponse,
}: FamilyRecordAccessTableProps) => {
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
                Eliminar
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
          <TableBody emptyContent={"No hay acessos al registro"} items={items}>
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

export default FamilyRecordAccessTable;

"use client";
import React, { useCallback } from "react";
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
import { IResponse } from "@/hooks/useApi";
import CustomSuspense from "@/components/custom-suspense";
import Loading from "@/components/loading";

type AllergiesAccess = {
  id: string;
  practitioner_name: string;
  practitioner_id: string;
  register_id: string;
};

interface AllergyRecordAccessTableProps {
  items: AllergiesAccess[];
  handleRevoke: (allergy_record_access: AllergiesAccess) => void;
  getActiveConsentListResponse: IResponse;
}

const AllergyAccessTable = ({
  items,
  handleRevoke,
  getActiveConsentListResponse,
}: AllergyRecordAccessTableProps) => {
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
          <TableBody emptyContent={"No se encontraron accesos."} items={items}>
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

export default AllergyAccessTable;

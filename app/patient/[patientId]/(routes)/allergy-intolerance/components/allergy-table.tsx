"use client";
import React, { Suspense, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  Button,
} from "@nextui-org/react";
import {
  allergyTypesMap,
  allergyTableColumns as columns,
  statusColorMap,
  statusMap,
} from "@/data/data";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import { useSession } from "next-auth/react";
import allergyIntoleranceService from "@/services/allergyIntoleranceService";
import CustomSuspense from "@/components/custom-suspense";
import TableSkeleton from "@/components/ui/skeletons/table-skeleton";

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
};

const AllergyTable: React.FC = () => {
  const router = useRouter();
  const { response, fetchData } = useApi();
  const { data: session } = useSession();
  const [items, setItems] = useState<Allergy[]>([]);

  useEffect(() => {
    fetchData(
      allergyIntoleranceService.getAllergyListByPatientId(
        session?.user?.id as string
      )
    );
  }, [session?.user?.id]);

  useEffect(() => {
    if (response?.data) {
      const data = response?.data;

      if (data && data.length > 0) {
        setItems(data);
      }
    }
  }, [response?.data]);

  const renderCell = React.useCallback(
    (allergy: Allergy, columnKey: React.Key) => {
      const cellValue = allergy[columnKey as keyof Allergy];

      switch (columnKey) {
        case "type":
          return allergyTypesMap[cellValue];

        case "clinical_status":
          return (
            <Chip
              color={statusColorMap[allergy.clinical_status]}
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
                className={"text-sm font-medium "}
                color='primary'
                radius='sm'
                size='sm'
                variant={"solid"}
                onClick={() =>
                  router.push(`allergy-intolerance/${allergy.allergy_id}`)
                }
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
    <CustomSuspense isLoading={response.isLoading} fallback={<TableSkeleton />}>
      <Table aria-label='Allergies collection table'>
        <TableHeader columns={columns}>
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
          emptyContent={"No se encontró registros de alergias"}
          items={items}
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
  );
};

export { AllergyTable };

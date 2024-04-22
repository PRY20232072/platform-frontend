"use client";

import {
  Input,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { healthRecordsTableColumns } from "@/data/data";
import { useApi } from "@/hooks/useApi";
import allergyIntoleranceService from "@/services/allergyIntoleranceService";
import CustomSuspense from "@/components/custom-suspense";
import TableSkeleton from "@/components/ui/skeletons/table-skeleton";
import familyRecordService from "@/services/familyRecordService";
import consentService from "@/services/consentService";

export const HealthRecordsSearch = () => {
  const [filterValue, setFilterValue] = React.useState("");
  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);
  const router = useRouter();
  const [allergyList, setAllergyList] = useState<any>([]);
  const [healthRecordsList, setHealthRecordsList] = useState<any>([]);
  const { response: allergyRecordsResponse, fetchData: getAllergyRecords } =
    useApi();
  const [familyRecordList, setFamilyRecordList] = useState<any>([]);
  const { response: familyRecordsResponse, fetchData: getFamilyRecord } =
    useApi();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await getAllergyRecords(allergyIntoleranceService.getAllergyList());
      await getFamilyRecord(familyRecordService.getFamilyRecordList());
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (allergyRecordsResponse.isSuccess) {
      parseAllergyList(allergyRecordsResponse.data);
    }
  }, [allergyRecordsResponse.isSuccess]);

  useEffect(() => {
    if (familyRecordsResponse.isSuccess) {
      parseFamilyRecordList(familyRecordsResponse.data);
    }
  }, [familyRecordsResponse.isSuccess]);

  const parseAllergyList = async (allergyList: any) => {
    const parsedAllergyList = await Promise.all(
      allergyList.map(async (allergy: any) => {
        try {
          const response =
            await consentService.getByRegisteryIdAndPractitionerId(
              allergy.allergy_id,
              params.practitionerId as string
            );
          const consent = response.data.data;
          allergy.has_access = consent.state;
          return {
            id: allergy.allergy_id,
            recorded_date: allergy.recorded_date,
            detail: allergy.allergy_notes,
            register_type: "ALERGIA",
          };
        } catch (error) {
          return null;
        }
      })
    );
    setAllergyList(parsedAllergyList);
    setHealthRecordsList(parsedAllergyList.concat(familyRecordList));
  };

  const parseFamilyRecordList = async (_familyRecordList: any) => {
    const parsedFamilyRecordList = await Promise.all(
      _familyRecordList.map(async (familyRecord: any) => {
        try {
          const response =
            await consentService.getByRegisteryIdAndPractitionerId(
              familyRecord.familyHistory_id,
              params.practitionerId as string
            );
          const consent = response.data.data;
          familyRecord.has_access = consent.state;
          return {
            id: familyRecord.familyHistory_id,
            recorded_date: familyRecord.recorded_date,
            detail: familyRecord.notes,
            register_type: "FAMILIAR",
          };
        } catch (error) {
          return null;
        }
      })
    );
    setFamilyRecordList(parsedFamilyRecordList);
    setHealthRecordsList(allergyList.concat(parsedFamilyRecordList));
  };

  const renderCell = React.useCallback(
    (health_records: any, columnKey: React.Key) => {
      const cellValue = health_records[columnKey as keyof any];

      switch (columnKey) {
        case "actions":
          return (
            <div className='relative flex justify-start items-start gap-2'>
              <Button
                className={" text-sm font-medium "}
                color='primary'
                radius='sm'
                size='sm'
                variant='flat'
                onClick={() =>
                  router.push(`health-records/${health_records.id}`)
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

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className='bg-blue-100 flex flex-col gap-4'>
        <div className='flex gap-3 items-end'>
          <Input
            isClearable
            variant='faded'
            size='sm'
            className='w-full sm:max-w-[26%] ml-1 mb-2 mt-2'
            placeholder='Buscar por detalle...'
            startContent={<SearchIcon className='h-4 w-4' />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <Input
            isClearable
            variant='faded'
            size='sm'
            className='w-full sm:max-w-[26%] mb-2 mt-2'
            placeholder='Buscar por ID...'
            startContent={<SearchIcon className='h-4 w-4' />}
            onClear={() => onClear()}
          />
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, hasSearchFilter]);

  return (
    <div className='w-full items-stretch justify-end gap-4 inline-flex mb-3'>
      <CustomSuspense
        isLoading={
          allergyRecordsResponse.isLoading || familyRecordsResponse.isLoading
        }
        fallback={<TableSkeleton />}
      >
        <Table
          color='primary'
          aria-label='Health Records table'
          selectionBehavior='toggle'
          isHeaderSticky
          selectionMode='single'
          topContent={topContent}
        >
          <TableHeader columns={healthRecordsTableColumns}>
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
            emptyContent={"No se encontraron registros médicos."}
            items={healthRecordsList}
          >
            {(item: any) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CustomSuspense>
    </div>
  );
};

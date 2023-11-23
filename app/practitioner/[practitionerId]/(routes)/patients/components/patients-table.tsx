'use client';

import {
  Input,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import { SearchIcon } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { patientsTableColumns } from '@/data/data';
import { useApi } from '@/hooks/useApi';
import patientService from '@/services/patientService';

type Patients = {
  name_id: string;
  telephone: string;
  patient_id: string;
}

export const PatientsSearch = () => {
  const { response: patientsResponse, fetchData: getPatients } = useApi();
  const [filterValue, setFilterValue] = useState('');
  const [patientsList, setPatientsList] = useState<Patients[]>([]);
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);
  const router = useRouter();

  useEffect(() => {
    getPatients(patientService.getPatientList());
  }, []);

  useEffect(() => {
    if (patientsResponse?.isSuccess) {
      parsePatientsData(patientsResponse?.data);
    }
  }, [patientsResponse?.isSuccess]);

  const parsePatientsData = (patients: any) => {
    const paredPatients = patients.map((patient: any) => ({
      name_id: patient.name_id,
      telephone: patient.telephone,
      patient_id: patient.patient_id,
    } as Patients));
    setPatientsList(paredPatients);
  };

  const renderCell = useCallback(
    (patient: Patients, columnKey: React.Key) => {
      const cellValue = patient[columnKey as keyof Patients];

      switch (columnKey) {
        case 'actions':
          return (
            <div className="relative flex justify-start items-start gap-2">
              <Button
                className={' text-sm font-medium '}
                color="primary"
                radius="sm"
                size="sm"
                variant="flat"
                onClick={() => router.push(`patients/${patient.patient_id}`)}
              >
                See more
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
      setFilterValue('');
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="bg-blue-100 flex flex-col gap-4">
        <div className="flex gap-3 items-end">
          <Input
            isClearable
            variant="faded"
            size="sm"
            className="w-full sm:max-w-[26%] ml-1 mb-2 mt-2"
            placeholder="Search by name..."
            startContent={<SearchIcon className="h-4 w-4" />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <Input
            isClearable
            variant="faded"
            size="sm"
            className="w-full sm:max-w-[26%] mb-2 mt-2"
            placeholder="Search by ID..."
            startContent={<SearchIcon className="h-4 w-4" />}
            onClear={() => onClear()}
          />
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, hasSearchFilter]);

  return (
    <Table
      color="primary"
      aria-label="Patients table"
      selectionBehavior="toggle"
      isHeaderSticky
      selectionMode="single"
      topContent={topContent}
    >
      <TableHeader columns={patientsTableColumns}>
        {(column) => (
          <TableColumn
            className="text-bold"
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No allergies data available'} items={patientsList}>
        {(item) => (
          <TableRow key={item.patient_id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

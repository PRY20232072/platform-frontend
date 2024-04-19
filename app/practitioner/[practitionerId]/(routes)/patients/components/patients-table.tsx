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
  Selection,
  SortDescriptor,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { SearchIcon } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { patientsTableColumns } from '@/data/data';
import { useApi } from '@/hooks/useApi';
import patientService from '@/services/patientService';
import CustomSuspense from '@/components/custom-suspense';
import TableSkeleton from '@/components/ui/skeletons/table-skeleton';

type Patient = {
  name_id: string;
  telephone: string;
  patient_id: string;
};

export const PatientsSearch = () => {
  const { response: patientsResponse, fetchData: getPatients } = useApi();
  const [filterValue, setFilterValue] = useState('');
  const [patientsList, setPatientsList] = useState<Patient[]>([]);
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);
  const router = useRouter();

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'name_id',
    direction: 'ascending',
  });
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [statusFilter, setStatusFilter] = React.useState<Selection>('all');

  useEffect(() => {
    getPatients(patientService.getPatientList());
  }, []);

  useEffect(() => {
    if (patientsResponse?.isSuccess) {
      parsePatientsData(patientsResponse?.data);
    }
  }, [patientsResponse?.isSuccess]);

  const parsePatientsData = (patients: any) => {
    const paredPatients = patients.map(
      (patient: any) =>
        ({
          name_id: patient.name_id,
          telephone: patient.telephone,
          patient_id: patient.patient_id,
        } as Patient)
    );
    setPatientsList(paredPatients);
  };

  const renderCell = useCallback((patient: Patient, columnKey: React.Key) => {
    const cellValue = patient[columnKey as keyof Patient];

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
              Ver más
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...patientsList];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((patient) =>
        patient.name_id.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [patientsList, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Patient, b: Patient) => {
      const first = a[
        sortDescriptor.column as keyof Patient
      ] as unknown as number;
      const second = b[
        sortDescriptor.column as keyof Patient
      ] as unknown as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

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
      <div className="bg-blue-100 flex flex-col gap-4 rounded-lg">
        <div className="flex gap-3 items-end">
          <Input
            isClearable
            variant="faded"
            size="sm"
            className="w-full sm:max-w-[26%] ml-1 mb-2 mt-2"
            placeholder="Buscar por nombre..."
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
            placeholder="Buscar por ID..."
            startContent={<SearchIcon className="h-4 w-4" />}
            onClear={() => onClear()}
          />
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, hasSearchFilter]);

  return (
    <CustomSuspense
      isLoading={patientsResponse.isLoading}
      fallback={<TableSkeleton />}
    >
      <Table
        color="primary"
        aria-label="Patient table"
        selectionBehavior="toggle"
        isHeaderSticky
        selectionMode="single"
        topContent={topContent}
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
        sortDescriptor={sortDescriptor}
        selectedKeys={selectedKeys}
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
        <TableBody
          emptyContent={'No se encontraron pacientes.'}
          items={patientsList}
        >
          {(item) => (
            <TableRow key={item.patient_id}>
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

'use client';
import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  ModalFooter,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import { Plus, SearchIcon } from 'lucide-react';
import React from 'react';
import { patientsTableColumns, patients } from '@/data/data';

type Patients = (typeof patients)[0];
interface PatientsTableProps {
  columns: typeof patientsTableColumns;
  items: typeof patients;
}

export const PatientsSearch: React.FC<PatientsTableProps> = ({
  items,
  columns,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [filterValue, setFilterValue] = React.useState('');

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);
  const router = useRouter();

  const renderCell = React.useCallback(
    (patients: Patients, columnKey: React.Key) => {
      const cellValue = patients[columnKey as keyof Patients];

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
                onClick={() => router.push(`patients/undefined`)}
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
    <div className="w-full items-stretch justify-end gap-4 inline-flex mb-3">
      <Table
        color="primary"
        aria-label="Patients table"
        selectionBehavior="toggle"
        isHeaderSticky
        selectionMode="single"
        topContent={topContent}
      >
        <TableHeader columns={columns}>
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
          emptyContent={'No allergies docs data available'}
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
    </div>
  );
};

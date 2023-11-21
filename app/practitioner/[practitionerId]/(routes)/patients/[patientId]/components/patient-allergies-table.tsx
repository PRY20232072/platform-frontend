'use client';
import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Chip,
  ChipProps,
} from '@nextui-org/react';

import {
  selectedPatientAllergiesTableColumns,
  selectedPatientAllergies,
} from '@/data/data';
import { useRouter } from 'next/navigation';
const statusColorMap: Record<string, ChipProps['color']> = {
  resolve: 'success',
  active: 'danger',
  innactive: 'warning',
};

type SelectedPatientAllergy = (typeof selectedPatientAllergies)[0];
interface SelectedPatientAllergiesProps {
  columns: typeof selectedPatientAllergiesTableColumns;
  items: typeof selectedPatientAllergies;
}

const PatientAllergiesTable: React.FC<SelectedPatientAllergiesProps> = ({
  items,
  columns,
}) => {
  const router = useRouter();
  const renderCell = React.useCallback(
    (
      selected_patient_allergy: SelectedPatientAllergy,
      columnKey: React.Key
    ) => {
      const cellValue =
        selected_patient_allergy[columnKey as keyof SelectedPatientAllergy];

      switch (columnKey) {
        case 'status':
          return (
            <Chip
              color={statusColorMap[selected_patient_allergy.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case 'has_access':
          return selected_patient_allergy.has_access === 'Yes' ? 'Yes' : 'No';
        case 'actions':
          return (
            <div className="relative flex justify-start items-start gap-2">
              {selected_patient_allergy.has_access === 'Yes' ? (
                <Button
                  className="font-medium "
                  color="primary"
                  radius="sm"
                  size="sm"
                  variant="flat"
                  onClick={() =>
                    router.push(`undefined/allergy-intolerance/undefined`)
                  }
                >
                  View more
                </Button>
              ) : selected_patient_allergy.has_access === 'Pending' ? (
                <Button
                  isDisabled
                  className="font-medium "
                  color="secondary"
                  radius="sm"
                  size="sm"
                  variant="flat"
                >
                  Pending
                </Button>
              ) : (
                <Button
                  className="font-medium "
                  color="warning"
                  radius="sm"
                  size="sm"
                  variant="flat"
                >
                  Request access
                </Button>
              )}
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
      <Table aria-label="Patient allergy collection table">
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
          emptyContent={'No patient allergies data available'}
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

export { PatientAllergiesTable };

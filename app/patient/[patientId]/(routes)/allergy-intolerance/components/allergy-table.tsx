'use client';
import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  ChipProps,
  Button,
} from '@nextui-org/react';
import { allergyTableColumns, patientAllergies } from '@/data/data';

const statusColorMap: Record<string, ChipProps['color']> = {
  resolve: 'success',
  active: 'danger',
  innactive: 'warning',
};
type Allergy = (typeof patientAllergies)[0];

interface AllergyTableProps {
  columns: typeof allergyTableColumns;
  items: typeof patientAllergies;
}

const AllergyTable: React.FC<AllergyTableProps> = ({ items, columns }) => {
  const renderCell = React.useCallback(
    (allergy: Allergy, columnKey: React.Key) => {
      const cellValue = allergy[columnKey as keyof Allergy];

      switch (columnKey) {
        case 'status':
          return (
            <Chip
              color={statusColorMap[allergy.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case 'actions':
          return (
            <div className="relative flex justify-start items-start gap-2">
              <Button
                className={'bg-sky-100 text-blue-600 text-sm font-medium '}
                color="primary"
                radius="sm"
                size="sm"
                variant={'solid'}
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

  return (
    <Table aria-label="Allergies collection table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No allergies data available'} items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export { AllergyTable };

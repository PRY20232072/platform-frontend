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
} from '@nextui-org/react';

import { allergyAccessTableColumns, patientAllergiesAccess } from '@/data/data';

type AllergiesAccess = (typeof patientAllergiesAccess)[0];
interface AllergyAccessTableProps {
  columns: typeof allergyAccessTableColumns;
  items: typeof patientAllergiesAccess;
}

const AllergyAccessClient: React.FC<AllergyAccessTableProps> = ({
  items,
  columns,
}) => {
  const renderCell = React.useCallback(
    (allergy_access: AllergiesAccess, columnKey: React.Key) => {
      const cellValue = allergy_access[columnKey as keyof AllergiesAccess];

      switch (columnKey) {
        case 'actions':
          return (
            <div className="relative flex justify-start items-start gap-2">
              <Button
                className="font-medium "
                color="danger"
                radius="sm"
                size="sm"
                variant="flat"
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
      <Table aria-label="Allergies Access collection table">
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
          emptyContent={'No allergies access data available'}
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

export { AllergyAccessClient };

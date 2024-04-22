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

import { allergyDocTableColumns, patientAllergiesDocs } from '@/data/data';

type AllergiesDocs = (typeof patientAllergiesDocs)[0];
interface AllergyDocsTableProps {
  columns: typeof allergyDocTableColumns;
  items: typeof patientAllergiesDocs;
}

const AllergyDocsClient: React.FC<AllergyDocsTableProps> = ({
  items,
  columns,
}) => {
  const renderCell = React.useCallback(
    (allergy_docs: AllergiesDocs, columnKey: React.Key) => {
      const cellValue = allergy_docs[columnKey as keyof AllergiesDocs];

      switch (columnKey) {
        case 'actions':
          return (
            <div className="relative flex justify-start items-start gap-2">
              <Button
                className="text-sm font-medium"
                radius="sm"
                size="sm"
                color="primary"
                variant="flat"
              >
                Preview
              </Button>
              <Button
                className=" text-sm font-medium"
                radius="sm"
                size="sm"
                color="success"
                variant="flat"
              >
                Download
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
      <Table aria-label="Allergies docs collection table">
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
          emptyContent={'No se encontraron documentos adjuntos al registro'}
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

export { AllergyDocsClient };

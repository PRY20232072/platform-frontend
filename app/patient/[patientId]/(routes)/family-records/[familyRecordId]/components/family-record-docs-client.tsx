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

import { patientFamilyRecordDocTableColumns, patientFamilyRecordDocs } from '@/data/data';

type FamilyRecordDoc = (typeof patientFamilyRecordDocs)[0];
interface FamilyRecordDocsTableProps {
  columns: typeof patientFamilyRecordDocTableColumns;
  items: typeof patientFamilyRecordDocs;
}

const FamilyRecordDocsClient: React.FC<FamilyRecordDocsTableProps> = ({
  items,
  columns,
}) => {
  const renderCell = React.useCallback(
    (family_record_doc: FamilyRecordDoc, columnKey: React.Key) => {
      const cellValue = family_record_doc[columnKey as keyof FamilyRecordDoc];

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
      <Table aria-label="Family record docs collection table">
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
          emptyContent={'No family record docs data available'}
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

export { FamilyRecordDocsClient };

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

import { useRouter } from 'next/router';
import {
  accessRequestTableColumns,
  practitionersAccessRequests,
} from '@/data/data';

type practitionerAccessRequest = (typeof practitionersAccessRequests)[0];

interface AccessRequestTableProps {
  columns: typeof accessRequestTableColumns;
  items: typeof practitionersAccessRequests;
}

const AccessRequestTable: React.FC<AccessRequestTableProps> = ({
  items,
  columns,
}) => {
  const renderCell = React.useCallback(
    (practitioner_request: practitionerAccessRequest, columnKey: React.Key) => {
      const cellValue =
        practitioner_request[columnKey as keyof practitionerAccessRequest];

      switch (columnKey) {
        case 'actions':
          return (
            <div className="relative flex justify-start items-start gap-2">
              <Button
                className="font-medium"
                color="primary"
                radius="sm"
                size="sm"
                variant="flat"
              >
                Approve
              </Button>
              <Button
                className="font-medium"
                color="danger"
                radius="sm"
                size="sm"
                variant="flat"
              >
                Reject
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
      <Table aria-label="Practitioners request collection table">
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
          emptyContent={'No practitioners request data available'}
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

export { AccessRequestTable };

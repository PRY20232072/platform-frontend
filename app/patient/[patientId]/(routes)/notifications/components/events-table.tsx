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

import { eventsTableColumns, events } from '@/data/data';

type Event = (typeof events)[0];

interface EventsTableProps {
  columns: typeof eventsTableColumns;
  items: typeof events;
}

const EventsTable: React.FC<EventsTableProps> = ({ items, columns }) => {
  const renderCell = React.useCallback((event: Event, columnKey: React.Key) => {
    const cellValue = event[columnKey as keyof Event];

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
              View Details
            </Button>
            <Button
              className="font-medium"
              color="danger"
              radius="sm"
              size="sm"
              variant="flat"
            >
              Delete
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
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

export { EventsTable };

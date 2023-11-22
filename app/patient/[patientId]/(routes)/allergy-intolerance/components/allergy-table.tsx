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
import { useParams, useRouter } from 'next/navigation';
import { type } from 'os';

const statusColorMap: Record<string, ChipProps['color']> = {
  RESOLVE: 'success',
  ACTIVE: 'danger',
  INNACTIVE: 'warning',
};

type Allergy = {
  patient_id:          string;
  participant_id:      string;
  type:                string;
  category:            string;
  criticality:         string;
  severity:            string;
  clinical_status:     string;
  verification_status: string;
  onset_date:          string;
  recorded_date:       string;
  last_occurrence:     string;
  allergy_notes:       string;
  allergy_id:          string;
}

interface AllergyTableProps {
  columns: typeof allergyTableColumns;
  items: Allergy[];
}

const AllergyTable: React.FC<AllergyTableProps> = ({ items, columns }) => {
  const router = useRouter();

  const renderCell = React.useCallback(
    (allergy: Allergy, columnKey: React.Key) => {
      const cellValue = allergy[columnKey as keyof Allergy];

      switch (columnKey) {
        case 'clinical_status':
          return (
            <Chip
              color={statusColorMap[allergy.clinical_status]}
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
                className={'text-sm font-medium '}
                color="primary"
                radius="sm"
                size="sm"
                variant={'solid'}
                onClick={() => router.push(`allergy-intolerance/undefined`)}
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
            className="text-bold"
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
          <TableRow key={item.allergy_id}>
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

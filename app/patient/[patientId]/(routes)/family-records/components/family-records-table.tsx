'use client';
import React, { Suspense, useEffect, useState } from 'react';
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
import { familyRecordTableColumns as columns } from '@/data/data';
import { useRouter } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import { useSession } from 'next-auth/react';
import familyRecordService from '@/services/familyRecordService';
import CustomSuspense from '@/components/custom-suspense';
import TableSkeleton from '@/components/ui/skeletons/table-skeleton';

const statusColorMap: Record<string, ChipProps['color']> = {
  RESOLVE: 'success',
  ACTIVE: 'danger',
  INNACTIVE: 'warning',
};

type PatientFamilyRecord = {
  name: string;
  patient_id: string;
  participant_id: string;
  reason: string;
  clinical_status: string;
  onset_date: string;
  recorded_date: string;
  family_record_note: string;
  family_name: string;
  family_gender: string;
  family_birthdate: string;
  family_record_id: string;
};

const FamilyRecordsTable: React.FC = () => {
  const router = useRouter();
  const { response, fetchData } = useApi();
  const { data: session } = useSession();
  const [items, setItems] = useState<PatientFamilyRecord[]>();

  useEffect(() => {
    fetchData(
      familyRecordService.getFamilyRecordByPatientId(
        session?.user?.id as string
      )
    );
  }, [session?.user?.id]);

  useEffect(() => {
    if (response?.data) {
      setItems(response?.data);
    }
  }, [response?.data]);

  const renderCell = React.useCallback(
    (familyRecord: PatientFamilyRecord, columnKey: React.Key) => {
      const cellValue = familyRecord[columnKey as keyof PatientFamilyRecord];

      switch (columnKey) {
        case 'clinical_status':
          return (
            <Chip
              color={statusColorMap[familyRecord.clinical_status]}
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
                onClick={() =>
                  router.push(`family-records/${familyRecord.family_record_id}`)
                }
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
    <CustomSuspense isLoading={response.isLoading} fallback={<TableSkeleton />}>
      <Table aria-label="Family records collection table">
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
          emptyContent={'No family records data available'}
          items={items}
        >
          {(item) => (
            <TableRow key={item.family_record_id}>
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

export { FamilyRecordsTable };
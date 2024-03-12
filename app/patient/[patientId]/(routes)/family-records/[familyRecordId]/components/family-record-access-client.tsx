'use client';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
} from '@nextui-org/react';

import { familyRecordAccessTableColumns } from '@/data/data';
import { useApi } from '@/hooks/useApi';
import consentService from '@/services/consentService';
import practitionerService from '@/services/practitionerService';
import { useParams } from 'next/navigation';

type FamilyRecordAccess = {
  id: string;
  practitioner_name: string;
  practitioner_id: string;
  register_id: string;
}

const FamilyRecordAccessClient = () => {
  const [items, setItems] = useState<FamilyRecordAccess[]>([]);
  const params = useParams();
  const { response: consentList, fetchData: getConsentList } = useApi();
  const { response: revokeConsentResponse, fetchData: revokeConsent } = useApi();

  const renderCell = useCallback(
    (family_record_access: FamilyRecordAccess, columnKey: React.Key) => {
      const cellValue = family_record_access[columnKey as keyof FamilyRecordAccess];

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
                onClick={() => handleRevoke(family_record_access)}
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

  useEffect(() => {
    const fetchData = async () => {
      if (params.familyRecordId) {
        await getConsentList(consentService.getByRegisterId(params.familyRecordId as string));
      }
    };

    fetchData();
  }, [params.familyRecordId]);

  useEffect(() => {
    if (revokeConsentResponse.isSuccess) {
      getConsentList(consentService.getByRegisterId(params.familyRecordId as string));
    }
  }, [revokeConsentResponse.isSuccess]);

  useEffect(() => {
    if (consentList.isSuccess) {
      parseConsentList(consentList.data);
    }
  }, [consentList.isSuccess]);

  const parseConsentList = async (consentList: any) => {
    if (!Array.isArray(consentList)) return [];

    consentList = consentList.filter((consent) => consent.state === 'ACTIVE');

    const parsedConsentList = await Promise.all(
      consentList.map(async (consent: any) => {
        try {
          const response = await practitionerService.getPractitionerById(consent.practitioner_id);
          const practitioner = response.data.data;
          return {
            id: consent.register_id + practitioner.practitioner_id,
            practitioner_name: practitioner.name_id,
            practitioner_id: practitioner.practitioner_id,
            register_id: consent.register_id,
          } as FamilyRecordAccess;
        } catch (error) {
          return {} as FamilyRecordAccess;
        }
      })
    );

    setItems(parsedConsentList);
  };

  const handleRevoke = async (consent: FamilyRecordAccess) => {
    await revokeConsent(consentService.revokeConsent(consent.register_id, consent.practitioner_id));
  }

  return (
    <>
      <Table aria-label="Family Record Access collection table">
        <TableHeader columns={familyRecordAccessTableColumns}>
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
          emptyContent={'No family record access data available'}
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

export { FamilyRecordAccessClient };

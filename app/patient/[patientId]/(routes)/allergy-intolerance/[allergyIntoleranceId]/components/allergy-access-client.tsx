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

import { allergyAccessTableColumns } from '@/data/data';
import { useApi } from '@/hooks/useApi';
import consentService from '@/services/consentService';
import practitionerService from '@/services/practitionerService';
import { useParams } from 'next/navigation';

type AllergiesAccess = {
  id: string;
  practitioner_name: string;
  practitioner_id: string;
  register_id: string;
}

const AllergyAccessClient = () => {
  const [items, setItems] = useState<AllergiesAccess[]>([]);
  const params = useParams();
  const { response: consentList, fetchData: getConsentList } = useApi();
  const { response: revokeConsentResponse, fetchData: revokeConsent } = useApi();

  const renderCell = useCallback(
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
                onClick={() => handleRevoke(allergy_access)}
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
    getConsentList(consentService.getByRegisterId(params.allergyIntoleranceId));
  }, [params.allergyIntoleranceId]);

  useEffect(() => {
    if (revokeConsentResponse.isSuccess) {
      getConsentList(consentService.getByRegisterId(params.allergyIntoleranceId));
    }
  }, [revokeConsentResponse.isSuccess]);

  useEffect(() => {
    if (consentList.isSuccess) {
      parseConsentList(consentList.data.data);
    }
  }, [consentList.isSuccess]);

  const parseConsentList = async (consentList: any) => {
    if (!Array.isArray(consentList)) return [];

    consentList = consentList.filter((consent) => consent.state === 'ACTIVE');

    const parsedConsentList = await Promise.all(
      consentList.map(async (consent: any) => {
        console.log(consent.practitioner_id);
        try {
          const response = await practitionerService.getPractitionerById(consent.practitioner_id);
          const practitioner = response.data.data;
          return {
            id: consent.register_id + practitioner.practitioner_id,
            practitioner_name: practitioner.name_id,
            practitioner_id: practitioner.practitioner_id,
            register_id: consent.register_id,
          } as AllergiesAccess;
        } catch (error) {
          return {} as AllergiesAccess;
        }
      })
    );

    setItems(parsedConsentList);
  };

  const handleRevoke = async (consent: AllergiesAccess) => {
    await revokeConsent(consentService.revokeConsent(consent.register_id, consent.practitioner_id));
  }

  return (
    <>
      <Table aria-label="Allergies Access collection table">
        <TableHeader columns={allergyAccessTableColumns}>
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

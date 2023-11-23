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

import {
  accessRequestTableColumns,
} from '@/data/data';
import consentService from '@/services/consentService';
import { useApi } from '@/hooks/useApi';
import practitionerService from '@/services/practitionerService';
import { useSession } from 'next-auth/react';
import allergyIntoleranceService from '@/services/allergyIntoleranceService';
import { useParams } from 'next/navigation';

type AllergiesAccess = {
  id: string;
  practitioner_name: string;
  practitioner_id: string;
  register_id: string;
}

const AccessRequestTable = () => {
  const { data: session } = useSession();
  const [items, setItems] = useState<AllergiesAccess[]>([]);
  const { response: allergyRegisters, fetchData: getAllergyRegisters } = useApi();
  const params = useParams();

  useEffect(() => {
    getAllergyRegisters(allergyIntoleranceService.getAllergyByPatientId(session?.user?.id));
  }, [session?.user?.id]);

  useEffect(() => {
    if (allergyRegisters.isSuccess) {
      getAllConsents(allergyRegisters.data);
    }
  }, [allergyRegisters.isSuccess]);

  const getAllConsents = async (allergyRegisters: any) => {
    const consentList = await Promise.all(
      allergyRegisters.map(async (register: any) => {
        const response = await consentService.getByRegisterId(register.allergy_id);
        return response.data.data;
      })
    );

    const flatArray = consentList.flat();

    parseConsentList(flatArray);
  };

  const parseConsentList = async (consentList: any) => {
    if (!Array.isArray(consentList)) return [];

    consentList = consentList.filter((consent) => consent.state !== 'ACTIVE');

    if (consentList.length === 0) return;

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
          } as AllergiesAccess;
        } catch (error) {
          return {} as AllergiesAccess;
        }
      })
    );

    setItems(parsedConsentList);
  };

  const handleApprove = async (consent: AllergiesAccess) => {
    await consentService.approveConsent(consent.register_id, consent.practitioner_id)
      .then(() => {
        getAllergyRegisters(allergyIntoleranceService.getAllergyByPatientId(params.patientId as string));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRevoke = async (consent: AllergiesAccess) => {
    await consentService.revokeConsent(consent.register_id, consent.practitioner_id)
      .then(() => {
        getAllergyRegisters(allergyIntoleranceService.getAllergyByPatientId(params.patientId as string));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const renderCell = useCallback((practitioner_request: AllergiesAccess, columnKey: React.Key) => {
    const cellValue =
      practitioner_request[columnKey as keyof AllergiesAccess];

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
              onClick={() => handleApprove(practitioner_request)}
            >
              Approve
            </Button>
            <Button
              className="font-medium"
              color="danger"
              radius="sm"
              size="sm"
              variant="flat"
              onClick={() => handleRevoke(practitioner_request)}
            >
              Reject
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
        <TableHeader columns={accessRequestTableColumns}>
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

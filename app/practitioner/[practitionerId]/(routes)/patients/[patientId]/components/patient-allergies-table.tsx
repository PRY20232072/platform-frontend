'use client';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Chip,
  ChipProps,
} from '@nextui-org/react';

import {
  selectedPatientAllergiesTableColumns,
} from '@/data/data';
import { useParams, useRouter } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import allergyIntoleranceService from '@/services/allergyIntoleranceService';
import consentService from '@/services/consentService';

const statusColorMap: Record<string, ChipProps['color']> = {
  RESOLVE: 'success',
  ACTIVE: 'danger',
  INNACTIVE: 'warning',
};

type Allergy = {
  patient_id: string;
  participant_id: string;
  type: string;
  category: string;
  criticality: string;
  severity: string;
  clinical_status: string;
  verification_status: string;
  onset_date: string;
  recorded_date: string;
  last_occurrence: string;
  allergy_notes: string;
  allergy_id: string;
  has_access: string;
}

export const PatientAllergiesTable = () => {
  const [allergyList, setAllergyList] = useState<Allergy[]>([]);
  const { response: getAllergyListResponse, fetchData: getAllergyList } = useApi();
  const { response: createConsentResponse, fetchData: createConsent } = useApi();
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    getAllergyList(allergyIntoleranceService.getAllergyByPatientId(params.patientId));
  }, [params.patientId]);

  useEffect(() => {
    if (getAllergyListResponse.isSuccess) {
      parseAllergyList(getAllergyListResponse.data);
    }
  }, [getAllergyListResponse.isSuccess]);

  const parseAllergyList = async (allergyList: any) => {
    const parsedAllergyList = await Promise.all(
      allergyList.map(async (allergy: any) => {
        try {
          const response = await consentService.getByRegisteryIdAndPractitionerId(allergy.allergy_id, params.practitionerId);
          const consent = response.data.data;
          allergy.has_access = consent.state;
          return allergy;
        } catch (error) {
          allergy.has_access = "NO";
          return allergy;
        }
      })
    );
    setAllergyList(parsedAllergyList);
  }

  const handleCreateConsent = async (allergyId: string) => {
    await createConsent(consentService.createConsent({
      register_id: allergyId,
      practitioner_id: params.practitionerId,
      register_type: 'ALLERGY'
    }));

    await getAllergyList(allergyIntoleranceService.getAllergyByPatientId(params.patientId));
    router.refresh();
  }

  const renderCell = React.useCallback(
    (
      selected_patient_allergy: Allergy,
      columnKey: React.Key
    ) => {
      const cellValue =
        selected_patient_allergy[columnKey as keyof Allergy];

      switch (columnKey) {
        case 'clinical_status':
          return (
            <Chip
              color={statusColorMap[selected_patient_allergy.clinical_status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case 'has_access':
          return selected_patient_allergy.has_access === 'ACTIVE' ? 'YES' : 'NO';
        case 'actions':
          return (
            <div className="relative flex justify-start items-start gap-2">
              {selected_patient_allergy.has_access === 'ACTIVE' ? (
                <Button
                  className="font-medium "
                  color="primary"
                  radius="sm"
                  size="sm"
                  variant="flat"
                  onClick={() =>
                    router.push(`${params.patientId}/allergy-intolerance/${selected_patient_allergy.allergy_id}`)
                  }
                >
                  View more
                </Button>
              ) : selected_patient_allergy.has_access === 'PENDING' ? (
                <Button
                  isDisabled
                  className="font-medium "
                  color="secondary"
                  radius="sm"
                  size="sm"
                  variant="flat"
                >
                  Pending
                </Button>
              ) : (
                <Button
                  className="font-medium "
                  color="warning"
                  radius="sm"
                  size="sm"
                  variant="flat"
                  onClick={() =>
                    handleCreateConsent(selected_patient_allergy.allergy_id)
                  }
                >
                  Request Access
                </Button>
              )}
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
      <Table aria-label="Patient allergy collection table">
        <TableHeader columns={selectedPatientAllergiesTableColumns}>
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
          emptyContent={'No patient allergies data available'}
          items={(allergyList || []) as Allergy[]}
        >
          {(item) => (
            <TableRow key={item.allergy_id}>
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

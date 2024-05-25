"use client";

import {
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Selection,
  SortDescriptor,
} from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { patientsTableColumns } from "@/data/data";
import { useApi } from "@/hooks/useApi";
import patientService from "@/services/patientService";
import CustomSuspense from "@/components/custom-suspense";
import TableSkeleton from "@/components/ui/skeletons/table-skeleton";
import consentService from "@/services/consentService";
import { toast } from "react-toastify";

type Patient = {
  name_id: string;
  telephone: string;
  patient_id: string;
  dni: string;
  access: string;
};

export const PatientsSearch = () => {
  const [patientsList, setPatientsList] = useState<Patient[]>([]);
  const { response: patientsResponse, fetchData: getPatients } = useApi();
  const { response: getConsentListResponse, fetchData: getConsentList } =
    useApi();
  const { fetchData: createConsent } = useApi();
  const params = useParams();
  const router = useRouter();

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "name_id",
    direction: "ascending",
  });

  // Fetch patients
  useEffect(() => {
    getPatients(patientService.getPatientList());
  }, []);

  // Fetch consent list
  useEffect(() => {
    const fetchData = async () => {
      if (params.practitionerId) {
        getConsentList(
          consentService.getByPractitionerId(params.practitionerId as string)
        );
      }
    };

    fetchData();
  }, [params.practitionerId]);

  // Parse patients data
  useEffect(() => {
    if (patientsResponse?.isSuccess && getConsentListResponse?.isSuccess) {
      parsePatientsData(patientsResponse?.data, getConsentListResponse?.data);
    }
  }, [patientsResponse?.isSuccess, getConsentListResponse?.isSuccess]);

  const parsePatientsData = (patients: any, consentList: any) => {
    const paredPatients = patients.map(
      (patient: any) =>
        ({
          name_id: patient.name_id,
          telephone: patient.telephone,
          patient_id: patient.patient_id,
          dni: patient.dni,
          access: getAccessState(patient.patient_id, consentList),
        } as Patient)
    );
    setPatientsList(paredPatients);
  };

  const getAccessState = (patientId: string, consentList: any): string => {
    const consent = consentList.find(
      (consent: any) => consent.patient_id === patientId
    );

    return consent?.state || "NO";
  };

  const handleCreateConsent = async (patientId: string) => {
    // Create consent
    await createConsent(
      consentService.createConsent({
        patient_id: patientId,
        practitioner_id: params.practitionerId as string,
      })
    );

    // Fetch updated consent list
    await getConsentList(
      consentService.getByPractitionerId(params.practitionerId as string)
    );

    toast.success("Solicitud de acceso enviada correctamente.");
  };

  const renderCell = useCallback((patient: Patient, columnKey: React.Key) => {
    const cellValue = patient[columnKey as keyof Patient];

    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex justify-start items-start gap-2">
            {patient.access === "ACTIVE" ? (
              <Button
                className="font-medium "
                color="primary"
                radius="sm"
                size="sm"
                variant="flat"
                onClick={() => router.push(`patients/${patient.patient_id}`)}
              >
                Ver más
              </Button>
            ) : patient.access === "PENDING" ? (
              <Button
                isDisabled
                className="font-medium "
                color="secondary"
                radius="sm"
                size="sm"
                variant="flat"
              >
                Pendiente
              </Button>
            ) : (
              <Button
                className="font-medium "
                color="warning"
                radius="sm"
                size="sm"
                variant="flat"
                onClick={() => handleCreateConsent(patient.patient_id)}
              >
                Solicitar acceso
              </Button>
            )}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <CustomSuspense
      isLoading={patientsResponse.isLoading}
      fallback={<TableSkeleton />}
    >
      <Table
        color="primary"
        aria-label="Patient table"
        selectionBehavior="toggle"
        isHeaderSticky
        selectionMode="single"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
        sortDescriptor={sortDescriptor}
        selectedKeys={selectedKeys}
      >
        <TableHeader columns={patientsTableColumns}>
          {(column) => (
            <TableColumn
              className="text-bold"
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No se encontraron pacientes."}
          items={patientsList}
        >
          {(item) => (
            <TableRow key={item.patient_id}>
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

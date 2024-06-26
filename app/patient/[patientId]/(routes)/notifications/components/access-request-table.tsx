"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";

import { accessRequestTableColumns } from "@/data/data";
import consentService from "@/services/consentService";
import { useApi } from "@/hooks/useApi";
import { useSession } from "next-auth/react";
import CustomSuspense from "@/components/custom-suspense";
import Loading from "@/components/loading";
import { toast } from "react-toastify";

type AccessRequest = {
  id: string;
  patient_id: string;
  practitioner_name: string;
  practitioner_id: string;
  state: string;
};

const AccessRequestTable = () => {
  const { data: session } = useSession();
  const [items, setItems] = useState<AccessRequest[]>([]);
  const {
    response: getPendingConsentListResponse,
    fetchData: getPendingConsentList,
  } = useApi();
  const { response: approveConsentResponse, fetchData: approveConsent } =
    useApi();
  const { response: revokeConsentResponse, fetchData: revokeConsent } =
    useApi();

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        await getPendingConsentList(
          consentService.getPendingConsentListByPatientId(
            session?.user?.id as string
          )
        );
      }
    };

    fetchData();
  }, [session?.user?.id]);

  useEffect(() => {
    if (
      !getPendingConsentListResponse.isLoading &&
      getPendingConsentListResponse.isSuccess
    ) {
      const pendingConsentList =
        getPendingConsentListResponse.data as AccessRequest[];
      setItems(pendingConsentList);
    }
  }, [getPendingConsentListResponse]);

  useEffect(() => {
    const fetchData = async () => {
      if (
        ((!approveConsentResponse.isLoading &&
          approveConsentResponse.isSuccess) ||
          (!revokeConsentResponse.isLoading &&
            revokeConsentResponse.isSuccess)) &&
        session?.user?.id
      ) {
        await getPendingConsentList(
          consentService.getPendingConsentListByPatientId(
            session?.user?.id as string
          )
        );
      }
    };

    fetchData();
  }, [approveConsentResponse, revokeConsentResponse, session?.user?.id]);

  const handleApprove = async (consent: AccessRequest) => {
    await approveConsent(
      consentService.approveConsent(
        consent.patient_id,
        consent.practitioner_id
      )
    );

    toast.info("Solicitud de acceso aprovada", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });

    location.reload();
  };

  const handleRevoke = async (consent: AccessRequest) => {
    await revokeConsent(
      consentService.revokeConsent(consent.patient_id, consent.practitioner_id)
    );
    toast.info("Solicitud de acceso rechazada", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });

    location.reload();
  };

  const renderCell = useCallback(
    (practitioner_request: AccessRequest, columnKey: React.Key) => {
      const cellValue =
        practitioner_request[columnKey as keyof AccessRequest];

      switch (columnKey) {
        case "actions":
          return (
            <div className='relative flex justify-start items-start gap-2'>
              <Button
                className='font-medium'
                color='primary'
                radius='sm'
                size='sm'
                variant='flat'
                onClick={() => handleApprove(practitioner_request)}
              >
                Aceptar
              </Button>
              <Button
                className='font-medium'
                color='danger'
                radius='sm'
                size='sm'
                variant='flat'
                onClick={() => handleRevoke(practitioner_request)}
              >
                Rechazar
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
      <div className='mb-4 font-bold text-2xl tracking-[0] leading-[24px]'>
        Solicitud de acceso
      </div>

      <CustomSuspense
        isLoading={getPendingConsentListResponse.isLoading}
        fallback={<Loading />}
      >
        <Table aria-label='Practitioners request collection table'>
          <TableHeader columns={accessRequestTableColumns}>
            {(column) => (
              <TableColumn
                className='text-bold'
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent={"No hay solicitudes de acceso pendientes."}
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
      </CustomSuspense>
    </>
  );
};

export { AccessRequestTable };

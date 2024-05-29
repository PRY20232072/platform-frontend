import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  ModalFooter,
} from "@nextui-org/react";

import { Plus } from "lucide-react";
import React, { useCallback } from "react";
import {
  practitionersTableColumns,
  practitionerTableColumns,
} from "@/data/data";
import consentService from "@/services/consentService";
import { AxiosResponse } from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

type Practitioner = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
};

interface PractitionerSearchProps {
  practitioners: Practitioner[];
  createConsent: (
    apiFunction: Promise<AxiosResponse<any, any>>
  ) => Promise<void>;
}

interface SelectedPractitionerProps {
  columns: typeof practitionerTableColumns;
  practitioner: Practitioner;
  searchModalClose: () => void;
  createConsent: (
    apiFunction: Promise<AxiosResponse<any, any>>
  ) => Promise<void>;
}

const ConfirmModal: React.FC<SelectedPractitionerProps> = ({
  columns,
  practitioner,
  searchModalClose,
  createConsent,
}) => {
  const params = useParams();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleCreateConsent = () => {
    createConsent(
      consentService.createConsent({
        patient_id: params.patientId as string,
        practitioner_id: practitioner.id,
      })
    ).then(() => {
      location.reload();
      onClose();
      searchModalClose();
      toast.success("Acceso otorgado con éxito");
    });
  };

  return (
    <>
      <Button
        className='text-sm font-medium '
        onPress={onOpen}
        radius='sm'
        size='sm'
        color='primary'
        variant='flat'
      >
        Seleccionar
      </Button>
      <Modal
        backdrop='blur'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className='w-[700px] max-w-full'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Confirmación
                <span className='text-default-400 text-small'>
                  ¿Está seguro de brindar acceso a su registro al siguiente
                  profesional de la salud?
                </span>
              </ModalHeader>
              <ModalBody>
                <Table
                  color='primary'
                  aria-label='Selected Health practitioner table'
                  selectionBehavior='toggle'
                  isHeaderSticky
                  selectionMode='single'
                >
                  <TableHeader columns={columns}>
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
                    emptyContent={
                      "No hay profesionales de la salud disponibles"
                    }
                  >
                    <TableRow key='1'>
                      <TableCell>{practitioner.name}</TableCell>
                      <TableCell>{practitioner.id}</TableCell>
                      <TableCell>{practitioner.email}</TableCell>
                      <TableCell>{practitioner.phone_number}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Cancelar
                </Button>
                <Button color='primary' onPress={handleCreateConsent}>
                  Aceptar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

const PractitionerSearchModal = ({
  practitioners,
  createConsent,
}: PractitionerSearchProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const renderCell = useCallback(
    (practitioner: Practitioner, columnKey: React.Key) => {
      const cellValue = practitioner[columnKey as keyof Practitioner];

      switch (columnKey) {
        case "actions":
          return (
            <div className='relative flex justify-start items-start gap-2'>
              <ConfirmModal
                columns={practitionerTableColumns}
                practitioner={practitioner}
                searchModalClose={onClose}
                createConsent={createConsent}
              />
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <div className='items-stretch justify-end   gap-4 inline-flex mb-3'>
      <Button
        onPress={onOpen}
        className='text-white bg-blue-600 px-4 rounded-xl justify-center items-center gap-3 flex'
      >
        Agregar nuevo <Plus className='h-4 w-4' />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className='w-[700px] max-w-full'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Buscar profesional de la salud
              </ModalHeader>

              <Table
                color='primary'
                aria-label='Health practitioner collection table'
                selectionBehavior='toggle'
                isHeaderSticky
                selectionMode='single'
              >
                <TableHeader columns={practitionersTableColumns}>
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
                  emptyContent={"No hay profesionales de la salud disponibles."}
                  items={practitioners}
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
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PractitionerSearchModal;

'use client';

import {
  Input,
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
} from '@nextui-org/react';

import { Plus, SearchIcon } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import {
  practitionersTableColumns,
  practitionerTableColumns,
} from '@/data/data';
import { useApi } from '@/hooks/useApi';
import practitionerService from '@/services/practitionerService';
import consentService from '@/services/consentService';
import { useParams } from 'next/navigation';

type Practitioner = {
  id: string,
  name: string,
  email: string,
  phone_number: string,
};

interface AllergySelectedPractitionerProps {
  columns: typeof practitionerTableColumns;
  practitioner: Practitioner;
  urlParams: any;
  searchModalClose: () => void;
}
const ConfirmModal: React.FC<AllergySelectedPractitionerProps> = ({
  columns,
  practitioner,
  urlParams,
  searchModalClose
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { fetchData: createConsent } = useApi();

  const handleCreateConsent = () => {
    createConsent(consentService.createConsent({
      register_id: urlParams.allergyIntoleranceId,
      practitioner_id: practitioner.id,
      register_type: "ALLERGY"
    }));

    onClose();
    searchModalClose();
  }

  return (
    <>
      <Button
        className="text-sm font-medium "
        onPress={onOpen}
        radius="sm"
        size="sm"
        color="primary"
        variant="flat"
      >
        Select
      </Button>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="w-[700px] max-w-full"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirmation
                <span className="text-default-400 text-small">
                  Are you sure to provide access to your medical records to the
                  following health practitioner?
                </span>
              </ModalHeader>
              <ModalBody>
                <Table
                  color="primary"
                  aria-label="Selected Health practitioner table"
                  selectionBehavior="toggle"
                  isHeaderSticky
                  selectionMode="single"
                >
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
                  <TableBody emptyContent={'No allergies docs data available'}>
                    <TableRow key="1">
                      <TableCell>{practitioner.name}</TableCell>
                      <TableCell>{practitioner.id}</TableCell>
                      <TableCell>{practitioner.email}</TableCell>
                      <TableCell>{practitioner.phone_number}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleCreateConsent}>
                  Accept
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export const PractitionersSearch = () => {
  const [items, setItems] = useState<Practitioner[]>([]);
  const params = useParams();
  const { response: practitioners, fetchData: setPractitioners } = useApi();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [filterValue, setFilterValue] = React.useState('');
  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);

  const renderCell = useCallback((practitioner: Practitioner, columnKey: React.Key) => {
    const cellValue = practitioner[columnKey as keyof Practitioner];

    switch (columnKey) {
      case 'actions':
        return (
          <div className="relative flex justify-start items-start gap-2">
            <ConfirmModal columns={practitionerTableColumns} practitioner={practitioner} urlParams={params} searchModalClose={onClose} />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  useEffect(() => {
    setPractitioners(practitionerService.getPractitionerList());
  }, [params.allergyIntoleranceId]);

  useEffect(() => {
    if (practitioners.isSuccess) {
      parsePractitioners(practitioners.data);
    }
  }, [practitioners.isSuccess]);

  const parsePractitioners = (practitioners: any) => {
    const parsedPractitioners = practitioners.map((practitioner: any) => ({
      id: practitioner.practitioner_id,
      name: practitioner.name_id,
      email: practitioner.email,
      phone_number: practitioner.telephone,
    } as Practitioner));

    setItems(parsedPractitioners);
  };

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[26%]"
            placeholder="Buscar por nombre..."
            startContent={<SearchIcon className="h-4 w-4" />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <Input
            isClearable
            className="w-full sm:max-w-[26%]"
            placeholder="Buscar por ID..."
            startContent={<SearchIcon className="h-4 w-4" />}
            onClear={() => onClear()}
          />
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, hasSearchFilter]);

  return (
    <div className="items-stretch justify-end   gap-4 inline-flex mb-3">
      <Button
        onPress={onOpen}
        className="text-white bg-blue-600 px-4 rounded-xl justify-center items-center gap-3 flex"
      >
        Add New <Plus className="h-4 w-4" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="w-[700px] max-w-full"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Search health practitioner
              </ModalHeader>

              <Table
                color="primary"
                aria-label="Health practitioner collection table"
                selectionBehavior="toggle"
                isHeaderSticky
                selectionMode="single"
                topContent={topContent}
              >
                <TableHeader columns={practitionersTableColumns}>
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
                  emptyContent={'No allergies docs data available'}
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
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

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
import React from 'react';
import {
  practitionersTableColumns,
  practitionerTableColumns,
  practitioners,
} from '@/data/data';

type Practitioners = (typeof practitioners)[0];
interface PractitionersTableProps {
  columns: typeof practitionersTableColumns;
  items: typeof practitioners;
}

interface AllergySelectedPractitionerProps {
  columns: typeof practitionerTableColumns;
}
const ConfirmModal: React.FC<AllergySelectedPractitionerProps> = ({
  columns,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
                      <TableCell>Dr. Juan Perez</TableCell>
                      <TableCell>81726354</TableCell>
                      <TableCell>juanperez@gmail.com</TableCell>
                      <TableCell>987654321</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
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

export const PractitionersSearch: React.FC<PractitionersTableProps> = ({
  items,
  columns,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [filterValue, setFilterValue] = React.useState('');

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const renderCell = React.useCallback(
    (practitioners: Practitioners, columnKey: React.Key) => {
      const cellValue = practitioners[columnKey as keyof Practitioners];

      switch (columnKey) {
        case 'actions':
          return (
            <div className="relative flex justify-start items-start gap-2">
              <ConfirmModal columns={practitionerTableColumns} />
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

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
            placeholder="Search by name..."
            startContent={<SearchIcon className="h-4 w-4" />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <Input
            isClearable
            className="w-full sm:max-w-[26%]"
            placeholder="Search by ID..."
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
                onRowAction={(key) => {
                  return <ConfirmModal columns={practitionerTableColumns} />;
                }}
                color="primary"
                aria-label="Health practitioner collection table"
                selectionBehavior="toggle"
                isHeaderSticky
                selectionMode="single"
                topContent={topContent}
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

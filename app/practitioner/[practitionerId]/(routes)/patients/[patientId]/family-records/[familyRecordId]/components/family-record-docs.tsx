import React from 'react';
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
  selectedPatientFamilyRecordDocsTableColumns,
  selectedPatientFamilyRecordDocs,
} from '@/data/data';

type familyrecordDoc = (typeof selectedPatientFamilyRecordDocs)[0];
interface PatientFamilyRecordDocsTableProps {
  columns: typeof selectedPatientFamilyRecordDocsTableColumns;
  items: typeof selectedPatientFamilyRecordDocs;
}

export const FamilyRecordDocs: React.FC<PatientFamilyRecordDocsTableProps> = ({
  items,
  columns,
}) => {
  const renderCell = React.useCallback(
    (family_record_doc: familyrecordDoc, columnKey: React.Key) => {
      const cellValue = family_record_doc[columnKey as keyof familyrecordDoc];

      switch (columnKey) {
        case 'has_access':
          return family_record_doc.has_access === 'Yes' ? 'Yes' : 'No';

        case 'actions':
          return (
            <div className="relative flex justify-start items-start gap-2">
              {family_record_doc.has_access === 'Yes' ? (
                <>
                  <Button
                    className="text-sm font-medium"
                    radius="sm"
                    size="sm"
                    color="primary"
                    variant="flat"
                  >
                    Preview
                  </Button>
                  <Button
                    className=" text-sm font-medium"
                    radius="sm"
                    size="sm"
                    color="success"
                    variant="flat"
                  >
                    Download
                  </Button>
                </>
              ) : family_record_doc.has_access === 'Pending' ? (
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
                >
                  Request access
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
      <Table aria-label="Family record docs collection table">
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
          emptyContent={'No family record docs data available'}
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


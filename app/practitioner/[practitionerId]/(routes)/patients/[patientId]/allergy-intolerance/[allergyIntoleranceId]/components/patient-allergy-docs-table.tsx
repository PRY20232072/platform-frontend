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
  selectedPatientAllergiesDocsTableColumns,
  selectedPatientAllergiesDocs,
} from '@/data/data';

type AllergiesDocs = (typeof selectedPatientAllergiesDocs)[0];
interface PatientAllergyDocsTableProps {
  columns: typeof selectedPatientAllergiesDocsTableColumns;
  items: typeof selectedPatientAllergiesDocs;
}

const PatientAllergyDocsTable: React.FC<PatientAllergyDocsTableProps> = ({
  items,
  columns,
}) => {
  const renderCell = React.useCallback(
    (allergy_docs: AllergiesDocs, columnKey: React.Key) => {
      const cellValue = allergy_docs[columnKey as keyof AllergiesDocs];

      switch (columnKey) {
        case 'has_access':
          return allergy_docs.has_access === 'Yes' ? 'Yes' : 'No';

        case 'actions':
          return (
            <div className="relative flex justify-start items-start gap-2">
              {allergy_docs.has_access === 'Yes' ? (
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
              ) : allergy_docs.has_access === 'Pending' ? (
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
      <Table aria-label="Allergies docs collection table">
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
  );
};
export { PatientAllergyDocsTable };

import CustomSuspense from "@/components/custom-suspense";
import Loading from "@/components/loading";
import { accessTableColumns } from "@/data/data";
import { IResponse } from "@/hooks/useApi";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useCallback } from "react";

type Consent = {
  id: string;
  patient_id: string;
  practitioner_name: string;
  practitioner_id: string;
  status: string;
};

interface AccessListProps {
  items: Consent[];
  handleRevoke: (consent: Consent) => void;
  getActiveConsentListResponse: IResponse;
}

const AccessList = ({
  items,
  handleRevoke,
  getActiveConsentListResponse,
}: AccessListProps) => {
  const renderCell = useCallback((consent: Consent, columnKey: React.Key) => {
    const cellValue = consent[columnKey as keyof Consent];

    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex justify-start items-start gap-2">
            <Button
              className="font-medium "
              color="danger"
              radius="sm"
              size="sm"
              variant="flat"
              onClick={() => handleRevoke(consent)}
            >
              Eliminar
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <CustomSuspense
        isLoading={getActiveConsentListResponse.isLoading}
        fallback={<Loading />}
      >
        <Table aria-label="Access collection table">
          <TableHeader columns={accessTableColumns}>
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
          <TableBody emptyContent={"No se encontraron accesos."} items={items}>
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

export default AccessList;

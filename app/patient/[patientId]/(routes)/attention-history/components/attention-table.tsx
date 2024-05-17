import CustomSuspense from "@/components/custom-suspense";
import TableSkeleton from "@/components/ui/skeletons/table-skeleton";
import { attentionTableColumns, typeOfAttentionMap } from "@/data/data";
import { useApi } from "@/hooks/useApi";
import attentionService from "@/services/attentionService";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Attention = {
  attention_id: string;
  recorded_date: string;
  typeOfAttention: string;
  nameOfConsultation: string;
  practitioner_name: string;
};

const AttentionTable = () => {
  const [attentionList, setAttentionList] = useState<Attention[]>([]);
  const { response: getAttentionListResponse, fetchData: fetchAttentionList } =
    useApi();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (params.patientId) {
        await fetchAttentionList(
          attentionService.getAttentionListByPatientId(
            params.patientId as string
          )
        );
      }
    };

    fetchData();
  }, [params.patientId]);

  useEffect(() => {
    if (getAttentionListResponse?.data) {
      setAttentionList(getAttentionListResponse.data || []);
    }
  }, [getAttentionListResponse?.data]);

  const renderCell = useCallback(
    (attention: Attention, columnKey: React.Key) => {
      const cellValue = attention[columnKey as keyof Attention];

      switch (columnKey) {
        case "typeOfAttention":
          return typeOfAttentionMap[cellValue];
        case "actions":
          return (
            <div className="relative flex justify-start items-start gap-2">
              <Button
                className={"text-sm font-medium "}
                color="primary"
                radius="sm"
                size="sm"
                variant={"solid"}
                onClick={() =>
                  router.push(`attention-history/${attention.attention_id}`)
                }
              >
                Ver más
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
    <CustomSuspense
      isLoading={getAttentionListResponse?.isLoading}
      fallback={<TableSkeleton />}
    >
      <Table aria-label="Attention collection table">
        <TableHeader columns={attentionTableColumns}>
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
          emptyContent={"No se encontró registros de atenciones"}
          items={attentionList}
        >
          {(item) => (
            <TableRow key={item.attention_id}>
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

export default AttentionTable;

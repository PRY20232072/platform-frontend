import CustomSuspense from "@/components/custom-suspense";
import Loading from "@/components/loading";
import { platformaPatientEventsTableColumns } from "@/data/data";
import { useApi } from "@/hooks/useApi";
import notificationsService from "@/services/notificationsService";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import EventDetailModal from "./event-detail-modal";
import { PlatformEvent } from "@/types/platformEvent";

const EventsHistoryTable = () => {
  const { data: session } = useSession();
  const params = useParams();
  const [events, setEvents] = useState<PlatformEvent[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { response: getNotificationsResponse, fetchData: getNotifications } =
    useApi();

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        await getNotifications(
          notificationsService.getReadNotificationsByUserId(session?.user?.id)
        );
      }
    };

    fetchData();
  }, [session?.user?.id, params.patientId]);

  useEffect(() => {
    if (getNotificationsResponse.isSuccess) {
      setEvents(getNotificationsResponse.data);
    }
  }, [getNotificationsResponse]);

  const renderCell = useCallback(
    (platform_event: PlatformEvent, columnKey: React.Key) => {
      const cellValue = platform_event[columnKey as keyof PlatformEvent];
      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex justify-start items-start gap-2">
              <Button
                className="font-medium"
                color="primary"
                radius="sm"
                size="sm"
                variant="flat"
                onPress={() => {
                  setSelectedEventId(platform_event.id);
                  onOpen();
                }}
              >
                View details
              </Button>
            </div>
          );
        case "created_at":
          return new Date(cellValue as string).toLocaleString();
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <>
      <div className="mb-4 font-bold text-2xl tracking-[0] leading-[24px]">
        Historial de eventos
      </div>

      <CustomSuspense
        isLoading={getNotificationsResponse.isLoading}
        fallback={<Loading />}
      >
        <Table aria-label="Platform events">
          <TableHeader columns={platformaPatientEventsTableColumns}>
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
            emptyContent={"No hay eventos para mostrar."}
            items={events}
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
      <EventDetailModal
        id={selectedEventId}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
      />
    </>
  );
};

export default EventsHistoryTable;

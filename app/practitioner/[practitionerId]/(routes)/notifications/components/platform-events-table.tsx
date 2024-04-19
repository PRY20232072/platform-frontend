import CustomSuspense from "@/components/custom-suspense";
import Loading from "@/components/loading";
import { platformaPractitionerEventsTableColumns } from "@/data/data";
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
import { useCallback, useEffect, useState } from "react";
import EventDetailModal from "./event-detail-modal";
import { PlatformEvent } from "@/types/platformEvent";

const PlatformEventsTable = () => {
  const { data: session } = useSession();
  const [events, setEvents] = useState<PlatformEvent[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { response: getNotificationsResponse, fetchData: getNotifications } =
    useApi();
  const {
    response: updateNotificationResponse,
    fetchData: updateNotification,
  } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        await getNotifications(
          notificationsService.getUnreadNotificationsByUserId(session?.user?.id)
        );
      }
    };

    fetchData();
  }, [session?.user?.id]);

  useEffect(() => {
    if (getNotificationsResponse.isSuccess) {
      setEvents(getNotificationsResponse.data);
    }
  }, [getNotificationsResponse]);

  useEffect(() => {
    if (updateNotificationResponse.isSuccess && session?.user?.id) {
      getNotifications(
        notificationsService.getUnreadNotificationsByUserId(session?.user?.id)
      );
    }
  }, [session?.user?.id, updateNotificationResponse]);

  const handleMarkAsRead = async (id: string) => {
    await updateNotification(
      notificationsService.updateNotifications(id, {
        read: true,
      })
    );
  };

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
              <Button
                className="font-medium"
                color="danger"
                radius="sm"
                size="sm"
                variant="flat"
                onClick={() => handleMarkAsRead(platform_event.id)}
              >
                Mark as read
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
        Eventos de la plataforma
      </div>

      <CustomSuspense
        isLoading={getNotificationsResponse.isLoading}
        fallback={<Loading />}
      >
        <Table aria-label="Platform events">
          <TableHeader columns={platformaPractitionerEventsTableColumns}>
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

export default PlatformEventsTable;

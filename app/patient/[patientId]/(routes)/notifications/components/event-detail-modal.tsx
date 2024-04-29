"use client";

import CustomSuspense from "@/components/custom-suspense";
import Loading from "@/components/loading";
import { eventTypeMap, registerTypeMap } from "@/data/data";
import { useApi } from "@/hooks/useApi";
import notificationsService from "@/services/notificationsService";
import { PlatformEvent } from "@/types/platformEvent";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

type EventDetailModalProps = {
  id: string | null;
  onOpenChange: () => void;
  isOpen: boolean;
};

const EventDetailModal = ({
  id,
  onOpenChange,
  isOpen,
}: EventDetailModalProps) => {
  const [event, setEvent] = useState<PlatformEvent | null>(null);
  const { response: getNotificationResponse, fetchData: getNotification } =
    useApi();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await getNotification(notificationsService.getNotificationsById(id));
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (getNotificationResponse.isSuccess) {
      // console.log("Event datail modal", getNotificationResponse.data);
      setEvent(getNotificationResponse.data);
    }
  }, [getNotificationResponse]);

  return (
    <>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="w-[700px] max-w-full"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Detalle del evento</ModalHeader>
              <ModalBody>
                <CustomSuspense
                  isLoading={getNotificationResponse.isLoading}
                  fallback={<Loading />}
                >
                  <div className="grid grid-flow-row gap-y-4">
                    <Input
                      isReadOnly={true}
                      type="text"
                      label="ID del registro"
                      labelPlacement="outside"
                      value={event?.register_id}
                    />
                    <Input
                      isReadOnly={true}
                      type="text"
                      label="Tipo de registro"
                      labelPlacement="outside"
                      value={registerTypeMap[event?.register_type as string] }
                    />
                    <Input
                      isReadOnly={true}
                      type="text"
                      label="ID del profesional de la salud"
                      labelPlacement="outside"
                      value={event?.practitioner_id}
                    />
                    <Input
                      isReadOnly={true}
                      type="text"
                      label="Nombre del profesional de la salud"
                      labelPlacement="outside"
                      value={event?.practitioner_name}
                    />
                    <Input
                      isReadOnly={true}
                      type="text"
                      label="Tipo de Evento"
                      labelPlacement="outside"
                      value={eventTypeMap[event?.type as string]}
                    />
                    <Input
                      isReadOnly={true}
                      type="text"
                      label="Fecha"
                      labelPlacement="outside"
                      value={new Date(
                        event?.created_at as string
                      ).toLocaleString()}
                    />
                  </div>
                </CustomSuspense>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventDetailModal;

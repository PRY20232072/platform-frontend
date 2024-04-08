"use client";

import CustomSuspense from "@/components/custom-suspense";
import Loading from "@/components/loading";
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
              <ModalHeader>Event Detail</ModalHeader>
              <ModalBody>
                <CustomSuspense
                  isLoading={getNotificationResponse.isLoading}
                  fallback={<Loading />}
                >
                  <div className="grid grid-flow-row gap-y-4">
                    <Input
                      isReadOnly={true}
                      type="text"
                      label="Patient ID"
                      labelPlacement="outside"
                      value={event?.patient_id}
                    />
                    <Input
                      isReadOnly={true}
                      type="text"
                      label="Patient Name"
                      labelPlacement="outside"
                      value={event?.patient_name}
                    />
                    <Input
                      isReadOnly={true}
                      type="text"
                      label="Message"
                      labelPlacement="outside"
                      value={event?.message}
                    />
                    <Input
                      isReadOnly={true}
                      type="text"
                      label="Date"
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
                  Close
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

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import React from 'react';
import { Plus } from 'lucide-react';

export function ConfirmModal({ iSOpen }: { iSOpen: boolean }) {
  const { isOpen = iSOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        className="text-white bg-blue-600 px-4 rounded-xl justify-center items-center gap-3 flex"
      >
        <Plus className="h-4 w-4" /> Confirm action
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
                Confirmación
              </ModalHeader>
              <Button
                onPress={onClose}
                className="text-white bg-blue-600 px-4 rounded-xl justify-center items-center gap-3 flex"
              >
                <Plus className="h-4 w-4" /> Aceptar
              </Button>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

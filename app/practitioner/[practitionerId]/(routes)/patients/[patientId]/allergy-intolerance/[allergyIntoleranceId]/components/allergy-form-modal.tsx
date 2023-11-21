'use client';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
  Textarea,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react';

import { RadioOptions } from '@/components/ui/radio-options';

import { Plus } from 'lucide-react';
import React from 'react';
import { allergyCategories, allergyStatus, allergyTypes } from '@/data/data';
import { AlertModal } from '@/components/modal/alert-modal';

const ConfirmModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} color="primary" variant="flat">
        Continue
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
                Request Access
              </ModalHeader>
              <ModalBody>
                <div>Do you want to request access to allergy record?</div>
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

export const AllergyFormModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="items-stretch justify-end gap-4 inline-flex mb-3">
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
              <ModalHeader className="flex flex-col gap-1 font-bold">
                Allergy questionnaire
              </ModalHeader>
              <ModalBody>
                <RadioOptions
                  label="Type"
                  defaultValue={allergyTypes[0].value}
                  data={allergyTypes}
                />
                <RadioOptions
                  label="Category"
                  defaultValue={allergyCategories[0].value}
                  data={allergyCategories}
                />
                <RadioOptions
                  label="Status"
                  defaultValue={allergyStatus[0].value}
                  data={allergyStatus}
                />
                <Textarea
                  classNames={{ label: 'text-md font-bold' }}
                  label="Note"
                  placeholder="Write the record note"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <ConfirmModal />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

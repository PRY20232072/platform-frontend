'use client';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
  ModalBody,
  ModalFooter,
  Input,
} from '@nextui-org/react';


import { Plus, Upload } from 'lucide-react';
import React, { ChangeEvent, useEffect, useState } from 'react';


import { useParams, useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useApi } from '@/hooks/useApi';
import familyRecordService from '@/services/familyRecordService';

type FamilyRecordDoc = {
  name: string;
  format: string;
  recorded_date: string;
  patient_id: string;
  participant_id: string;
  family_record_id: string;
};

interface FamilyRecordSelectedPractitionerProps {
  familyRecordDoc: FamilyRecordDoc;
  familyRecordFormModalClose: () => void;
}

const ConfirmModal: React.FC<FamilyRecordSelectedPractitionerProps> = ({
  familyRecordDoc,
  familyRecordFormModalClose,
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { response: createFamilyRecordResponse, fetchData: createFamilyRecord } =
    useApi();
  const router = useRouter();

  const handleCreate = () => {
    familyRecordDoc.recorded_date = new Date().toISOString().split('T')[0];
    const family_record_id = uuidv4();

    createFamilyRecord(
      familyRecordService.createFamilyRecord({
        identifier: family_record_id,
        payload: familyRecordDoc,
      })
    );

    router.refresh();
    onClose();
    familyRecordFormModalClose();
  };

  return (
    <>
      <Button onPress={onOpen} color="primary" variant="flat">
        Continue
      </Button>
      <Modal
        size="md"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Request Access
              </ModalHeader>
              <ModalBody>
                <div>Do you want to request access to family record?</div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onClick={handleCreate}>
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

export const FamilyRecordDocFormModal = () => {
  const [familyRecordDoc, setRecord] = useState<FamilyRecordDoc>(
    {} as FamilyRecordDoc
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const params = useParams();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setRecord({
      name: '',
      format: '',
      recorded_date: '',
      patient_id: params.patientId as string,
      participant_id: params.practitionerId as string,
      family_record_id: params.familyRecordId as string,
    });
  }, [params.patientId, params.practitionerId,params.familyRecordId]);

  const handleChange = (e: any) => {
    setFile(e.target.files?.[0]);
  };

   

  return (
    <div className="items-stretch justify-end gap-4 inline-flex mb-3">
      <Button
        onPress={onOpen}
        className="text-white bg-blue-600 px-4 rounded-xl justify-center items-center gap-3 flex"
      >
        Add New <Plus className="h-4 w-4" />
      </Button>
      <Modal
        placement="auto"
        backdrop="opaque"
        scrollBehavior="outside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <form>
              <ModalHeader className="flex flex-col gap-1 font-bold">
                Family Record Document questionnaire
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  placeholder="Complete the document's name"
                  classNames={{ label: 'text-md font-bold' }}
                  value={familyRecordDoc.name}
                  onChange={(e) => {
                    setRecord({ ...familyRecordDoc, name: e.target.value });
                  }}
                />

                <Input
                  type="file"
                  size='lg'
                  radius="lg"
                  labelPlacement="outside"
                  label="Choose a file to upload"
                  classNames={{ label: 'text-sm font-bold', inputWrapper: 'border-dashed border-2 border-gray-400 ',input: 'opacity-0 absolute hover:cursor-pointer' }}
                  onChange={handleChange}
                  startContent={<><Upload /> <span className="text-sm text-gray-500 ml-2 ">{file?file.name:'Drag your file here. Max file size: 100MB'}</span></>}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <ConfirmModal
                  familyRecordDoc={familyRecordDoc}
                  familyRecordFormModalClose={onClose}
                />
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

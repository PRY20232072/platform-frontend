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
  Input,
} from '@nextui-org/react';

import { RadioOptions } from '@/components/ui/radio-options';

import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { familyRecordStatus, genders } from '@/data/data';

import { useParams, useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useApi } from '@/hooks/useApi';
import familyRecordService from '@/services/familyRecordService';

type PatientFamilyRecord = {
  name: string;
  patient_id: string;
  participant_id: string;
  reason: string;
  clinical_status: string;
  onset_date: string;
  recorded_date: string;
  family_record_note: string;
  family_name: string;
  family_gender: string;
  family_birthdate: string;
};

interface FamilyRecordSelectedPractitionerProps {
  familyRecord: PatientFamilyRecord;
  familyRecordFormModalClose: () => void;
}

const ConfirmModal: React.FC<FamilyRecordSelectedPractitionerProps> = ({
  familyRecord,
  familyRecordFormModalClose,
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    response: createFamilyRecordResponse,
    fetchData: createFamilyRecord,
  } = useApi();
  const router = useRouter();

  const handleCreate = () => {
    familyRecord.recorded_date = new Date().toISOString().split('T')[0];
    const family_record_id = uuidv4();

    createFamilyRecord(
      familyRecordService.createFamilyRecord({
        identifier: family_record_id,
        payload: familyRecord,
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

export const FamilyRecordFormModal = () => {
  const [familyRecord, setRecord] = useState<PatientFamilyRecord>(
    {} as PatientFamilyRecord
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const params = useParams();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setRecord({
      name: '',
      reason: '',
      clinical_status: 'PARTIAL',
      onset_date: '',
      recorded_date: '',
      family_record_note: '',
      family_name: '',
      family_gender: 'MALE',
      family_birthdate: '',
      patient_id: params.patientId as string,
      participant_id: params.practitionerId as string,
    });
  }, [params.patientId, params.practitionerId]);

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
                Family Record questionnaire
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  placeholder="Complete the record's name"
                  classNames={{ label: 'text-md font-bold' }}
                  value={familyRecord.name}
                  onChange={(e) => {
                    setRecord({ ...familyRecord, name: e.target.value });
                  }}
                />

                <Input
                  type="date"
                  label="Record Date"
                  placeholder="Complete the relative birthdate"
                  classNames={{ label: 'text-md font-bold' }}
                  value={familyRecord.family_birthdate}
                  onChange={(e) => {
                    setRecord({
                      ...familyRecord,
                      family_birthdate: e.target.value,
                    });
                  }}
                />

                <Textarea
                  classNames={{ label: 'text-md font-bold' }}
                  label="Reason"
                  placeholder="Write the family record reason"
                  value={familyRecord.reason}
                  onChange={(e) => {
                    setRecord({
                      ...familyRecord,
                      reason: e.target.value,
                    });
                  }}
                />

                <Textarea
                  classNames={{ label: 'text-md font-bold' }}
                  label="Note"
                  placeholder="Write the record note"
                  value={familyRecord.family_record_note}
                  onChange={(e) => {
                    setRecord({
                      ...familyRecord,
                      family_record_note: e.target.value,
                    });
                  }}
                />
                <RadioOptions
                  label="Gender"
                  defaultValue={genders[0].value}
                  data={genders}
                  onChange={(e) => {
                    setRecord({
                      ...familyRecord,
                      family_gender: e.target.value,
                    });
                  }}
                />

                <RadioOptions
                  label="Status"
                  defaultValue={familyRecordStatus[0].value}
                  data={familyRecordStatus}
                  onChange={(e) => {
                    setRecord({
                      ...familyRecord,
                      clinical_status: e.target.value,
                    });
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <ConfirmModal
                  familyRecord={familyRecord}
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
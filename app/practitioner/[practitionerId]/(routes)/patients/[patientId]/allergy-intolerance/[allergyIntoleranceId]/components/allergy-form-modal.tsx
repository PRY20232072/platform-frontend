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
import { allergyCategories, allergyStatus, allergyTypes } from '@/data/data';
import { useParams, useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useApi } from '@/hooks/useApi';
import allergyIntoleranceService from '@/services/allergyIntoleranceService';

type Allergy = {
  name: string;
  category: string;
  clinical_status: string;
  recorded_date: string;
  type: string;
  allergy_notes: string;
  patient_id: string;
  participant_id: string;
}

interface AllergySelectedPractitionerProps {
  allergy: Allergy;
  allergyFormModalClose: () => void;
}

const ConfirmModal: React.FC<AllergySelectedPractitionerProps> = ({
  allergy,
  allergyFormModalClose
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { response: createAllergyResponse, fetchData: createAllergy } = useApi();
  const router = useRouter();

  const handleCreate = () => {
    allergy.recorded_date = new Date().toISOString().split('T')[0];
    const allergy_id = uuidv4();

    createAllergy(allergyIntoleranceService.createAllergy({
      identifier: allergy_id,
      payload: allergy
    }));

    router.refresh();
    onClose();
    allergyFormModalClose();
  }

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

export const AllergyFormModal = () => {
  const [allergy, setAllergy] = useState<Allergy>({} as Allergy);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const params = useParams();

  useEffect(() => {
    setAllergy({
      name: '',
      category: 'FOOD',
      clinical_status: 'ACTIVE',
      recorded_date: '',
      type: 'DAIRY',
      allergy_notes: '',
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
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="w-[700px] max-w-full"
      >
        <ModalContent>
          {(onClose) => (
            <form>
              <ModalHeader className="flex flex-col gap-1 font-bold">
                Allergy questionnaire
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  placeholder="Complete the name"
                  classNames={{ label: 'text-md font-bold' }}
                  value={allergy.name}
                  onChange={(e) => {
                    setAllergy({ ...allergy, name: e.target.value })
                  }}
                />
                <RadioOptions
                  label="Type"
                  defaultValue={allergyTypes[0].value}
                  data={allergyTypes}
                  onChange={(e) => {
                    setAllergy({ ...allergy, type: e.target.value })
                  }}
                />
                <RadioOptions
                  label="Category"
                  defaultValue={allergyCategories[0].value}
                  data={allergyCategories}
                  onChange={(e) => {
                    setAllergy({ ...allergy, category: e.target.value })
                  }}
                />
                <RadioOptions
                  label="Status"
                  defaultValue={allergyStatus[0].value}
                  data={allergyStatus}
                  onChange={(e) => {
                    setAllergy({ ...allergy, clinical_status: e.target.value })
                  }}
                />
                <Textarea
                  classNames={{ label: 'text-md font-bold' }}
                  label="Note"
                  placeholder="Write the record note"
                  value={allergy.allergy_notes}
                  onChange={(e) => {
                    setAllergy({ ...allergy, allergy_notes: e.target.value })
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <ConfirmModal allergy={allergy} allergyFormModalClose={onClose} />
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

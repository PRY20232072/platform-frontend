"use client";
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
} from "@nextui-org/react";

import { RadioOptions } from "@/components/ui/radio-options";

import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { familyRecordStatus, genders } from "@/data/data";

import { useParams, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useApi } from "@/hooks/useApi";
import familyRecordService from "@/services/familyRecordService";
import notificationsService from "@/services/notificationsService";

type PatientFamilyRecord = {
  name: string;
  patient_id: string;
  participant_id: string;
  reason: string;
  clinical_status: string;
  onset_date: string;
  recorded_date: string;
  notes: string;
  // family_name: string;
  // family_gender: string;
  // family_birthdate: string;
};

interface FamilyRecordSelectedPractitionerProps {
  familyRecord: PatientFamilyRecord;
  familyRecordFormModalClose: () => void;
  formIsValid: boolean;
}

const ConfirmModal: React.FC<FamilyRecordSelectedPractitionerProps> = ({
  familyRecord,
  familyRecordFormModalClose,
  formIsValid,
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    response: createFamilyRecordResponse,
    fetchData: createFamilyRecord,
  } = useApi();
  const router = useRouter();
  const params = useParams();

  const handleCreate = () => {
    familyRecord.recorded_date = new Date().toISOString().split("T")[0];
    const familyHistory_id = uuidv4();
    createFamilyRecord(
      familyRecordService.createFamilyRecord({
        identifier: familyHistory_id,
        payload: familyRecord,
      })
    );

    notificationsService.createNotifications({
      user_id: params.patientId,
      practitioner_id: params.practitionerId,
      register_id: familyHistory_id,
      register_type: "FAMILY_HISTORY",
      type: "WRITE",
    });

    location.reload();
    onClose();
    familyRecordFormModalClose();
  };

  return (
    <>
      <Button
        onPress={() => {
          if (formIsValid) {
            onOpen();
          }
        }}
        color="primary"
        variant="flat"
      >
        Continuar
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
                Solicitar acceso
              </ModalHeader>
              <ModalBody>
                <div>¿Quieres solicitar acceso al registro familiar?</div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onClick={handleCreate}>
                  Aceptar
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
  const [errors, setErrors] = useState<any>({
    name: "Se requiere el nombre",
    reason: "Se requiere la razón",
    notes: "Se requiere la nota",
  });
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setRecord({
      name: "",
      reason: "",
      clinical_status: "PARCIAL",
      onset_date: "",
      recorded_date: "",
      notes: "",
      // family_name: '',
      // family_gender: 'MALE',
      // family_birthdate: '',
      patient_id: params.patientId as string,
      participant_id: params.practitionerId as string,
    });
  }, [params.patientId, params.practitionerId]);

  const validateForm = () => {
    let valid = true;
    const errors: any = {};

    if (!familyRecord.name) {
      errors.name = "El nombre es requerido";
      valid = false;
    }

    if (!familyRecord.reason) {
      errors.reason = "La razón es requerida";
      valid = false;
    }

    if (!familyRecord.notes) {
      errors.notes = "La nota es requerida";
      valid = false;
    }

    setErrors(errors);
    setFormIsValid(valid);
  };

  return (
    <div className="items-stretch justify-end gap-4 inline-flex mb-3">
      <Button
        onPress={onOpen}
        className="text-white bg-blue-600 px-4 rounded-xl justify-center items-center gap-3 flex"
      >
        Agregar nuevo <Plus className="h-4 w-4" />
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
                Cuestionario de registro de historial familiar
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Nombre"
                  placeholder="Escribe el nombre del registro"
                  classNames={{ label: "text-md font-bold" }}
                  value={familyRecord.name}
                  onChange={(e) => {
                    setRecord({ ...familyRecord, name: e.target.value });
                    if (errors.name) {
                      setErrors({ ...errors, name: null });
                    }
                    validateForm();
                  }}
                  isRequired
                />
                {errors.name && (
                  <div className="text-red-500 text-sm">{errors.name}</div>
                )}

                {/* <Input
                  type="date"
                  label="Record Date"
                  placeholder="Complete the relative birthdate"
                  classNames={{ label: 'text-md font-bold' }}
                  value={familyRecord.recorded_date}
                  onChange={(e) => {
                    setRecord({
                      ...familyRecord,
                      family_birthdate: e.target.value,
                    });
                  }}
                /> */}

                <Textarea
                  classNames={{ label: "text-md font-bold" }}
                  label="Razón"
                  placeholder="Escribe la razón del registro"
                  value={familyRecord.reason}
                  onChange={(e) => {
                    setRecord({
                      ...familyRecord,
                      reason: e.target.value,
                    });
                    if (errors.reason) {
                      setErrors({ ...errors, reason: null });
                    }
                    validateForm();
                  }}
                  isRequired
                />
                {errors.reason && (
                  <div className="text-red-500 text-sm">{errors.reason}</div>
                )}

                <Textarea
                  classNames={{ label: "text-md font-bold" }}
                  label="Nota"
                  placeholder="Escribe una nota sobre el registro"
                  value={familyRecord.notes}
                  onChange={(e) => {
                    setRecord({
                      ...familyRecord,
                      notes: e.target.value,
                    });
                    if (errors.notes) {
                      setErrors({ ...errors, notes: null });
                    }
                    validateForm();
                  }}
                  isRequired
                />
                {errors.notes && (
                  <div className="text-red-500 text-sm">{errors.notes}</div>
                )}
                {/* <RadioOptions
                  label="Gender"
                  defaultValue={genders[0].value}
                  data={genders}
                  onChange={(e) => {
                    setRecord({
                      ...familyRecord,
                      family_gender: e.target.value,
                    });
                  }}
                /> */}

                <RadioOptions
                  label="Estado"
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
                  Cancelar
                </Button>
                <ConfirmModal
                  familyRecord={familyRecord}
                  familyRecordFormModalClose={onClose}
                  formIsValid={formIsValid}
                />
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

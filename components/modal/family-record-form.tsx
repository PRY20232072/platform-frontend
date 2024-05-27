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
import { CustomAutocomplete } from "@/components/ui/auto-complete";

import { RadioOptions } from "@/components/ui/radio-options";

import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  familyRecordStatus,
  genders,
  relationships,
  typeOfDiagnosis,
} from "@/data/data";

import { useParams, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useApi } from "@/hooks/useApi";
import familyRecordService from "@/services/familyRecordService";
import notificationsService from "@/services/notificationsService";
import { toast } from "react-toastify";
import { CustomAutoCompleteLarge } from "../ui/auto-complete-large";
import cieCodes from "@/data/cie10Codes_ES.json";
import AutocompleteLg from "../ui/auto-complete-lg";

type Diagnosis = {
  id: number;
  code: string;
  description: string;
  type: string;
};
type PatientFamilyRecord = {
  name: string;
  patient_id: string;
  participant_id: string;
  relationship: string;
  clinical_status: string;
  onset_date: string;
  recorded_date: string;
  notes: string;
  gender: string;
  relativeBirthdate: string;
  diagnoses: Diagnosis[];
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
    const filteredDiagnoses = familyRecord.diagnoses.map(
      ({ id, ...rest }) => rest
    );
    familyRecord.recorded_date = new Date().toISOString().split("T")[0];
    const payload = {
      ...familyRecord,
      diagnoses: filteredDiagnoses,
    };

    const familyHistory_id = uuidv4();
    createFamilyRecord(
      familyRecordService.createFamilyRecord({
        identifier: familyHistory_id,
        payload: payload,
      })
    );

    notificationsService
      .createNotifications({
        user_id: params.patientId,
        practitioner_id: params.practitionerId,
        register_id: familyHistory_id,
        register_type: "FAMILY_HISTORY",
        type: "WRITE",
      })
      .then((response) => {
        location.reload();
        onClose();
        familyRecordFormModalClose();
        toast.success("Registro de historial familiar creado con éxito");
      });
  };

  return (
    <>
      <Button
        onPress={() => {
          if (formIsValid) {
            onOpen();
          }
        }}
        color='primary'
        variant='flat'
      >
        Continuar
      </Button>
      <Modal
        size='md'
        backdrop='blur'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Confirmación
              </ModalHeader>
              <ModalBody>
                <div>¿Estas seguro de crear el antecedente?</div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Cancelar
                </Button>
                <Button color='primary' onClick={handleCreate}>
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
    notes: "Se requiere la condición",
    gender: "Se requiere el género",
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [diagnoses, setDiagnoses] = useState([
    { id: 1, code: "", type: "", description: "" },
  ]);
  useEffect(() => {
    setRecord({
      name: "",
      clinical_status: "PARTIAL",
      gender: "MALE",
      onset_date: "",
      recorded_date: "",
      relationship: "FATHER",
      notes: "",
      relativeBirthdate: "",
      diagnoses: [],
      patient_id: params.patientId as string,
      participant_id: params.practitionerId as string,
    });
  }, [params.patientId, params.practitionerId]);

  const addDiagnosis = () => {
    setDiagnoses([
      ...diagnoses,
      {
        id: diagnoses.length + 1,
        code: "",
        type: "",
        description: "",
      },
    ]);
  };

  const removeDiagnosis = (id: any) => {
    setDiagnoses(diagnoses.filter((d) => d.id !== id));
    setRecord({
      ...familyRecord,
      diagnoses: diagnoses.filter((d) => d.id !== id),
    });
  };

  const handleDiagnosisChange = (id: any, key: any, value: any) => {
    const updatedDiagnoses = diagnoses.map((d) =>
      d.id === id ? { ...d, [key]: value } : d
    );
    setDiagnoses(updatedDiagnoses);

    setRecord({ ...familyRecord, diagnoses: updatedDiagnoses });
  };

  useEffect(() => {
    validateForm();
  }, [familyRecord]);

  const validateForm = () => {
    let valid = true;
    const errors: any = {};

    if (!familyRecord.name) {
      errors.name = "El nombre del familiar es requerido";
      valid = false;
    }

    if (!familyRecord.gender) {
      errors.gender = "El género es requerido";
      valid = false;
    }

    if (!familyRecord.notes) {
      errors.notes = "La condición es requerida";
      valid = false;
    }

    setErrors(errors);
    setFormIsValid(valid);
  };

  return (
    <div className='items-stretch justify-end gap-4 inline-flex mb-3'>
      <Button
        onPress={onOpen}
        className='text-white bg-blue-600 px-4 rounded-xl justify-center items-center gap-3 flex'
      >
        Añadir nuevo <Plus className='h-4 w-4' />
      </Button>
      <Modal
        placement='auto'
        backdrop='opaque'
        scrollBehavior='outside'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <form>
              <ModalHeader className='flex flex-col gap-1 font-bold'>
                Cuestionario de antecedente familiar
              </ModalHeader>
              <ModalBody>
                <Input
                  label='Nombre del familiar'
                  placeholder='Escriba el nombre del familiar'
                  classNames={{ label: "text-md font-bold" }}
                  value={familyRecord.name}
                  onChange={(e) => {
                    setRecord({ ...familyRecord, name: e.target.value });
                    if (errors.name) {
                      setErrors({ ...errors, name: null });
                    }
                  }}
                  isRequired
                />
                {errors.name && (
                  <div className='text-red-500 text-sm'>{errors.name}</div>
                )}

                <Input
                  type='date'
                  label='Fecha de nacimiento del familiar'
                  placeholder='Completa la fecha de nacimiento'
                  classNames={{ label: "text-md font-bold" }}
                  value={familyRecord.relativeBirthdate}
                  onChange={(e) => {
                    setRecord({
                      ...familyRecord,
                      relativeBirthdate: e.target.value,
                    });
                  }}
                />
                <CustomAutocomplete
                  isDisabled={false}
                  label='Parentesco'
                  labelPlacement='outside'
                  placeholder='Selecciona el parentesco'
                  data={relationships}
                  selectedKey={familyRecord.relationship}
                  onSelectionChange={(value) =>
                    setRecord({
                      ...familyRecord,
                      relationship: value,
                    })
                  }
                />
                {errors.gender && (
                  <div className='text-red-500 text-sm'>{errors.gender}</div>
                )}
                <CustomAutocomplete
                  isDisabled={false}
                  label='Género'
                  labelPlacement='outside'
                  placeholder='Selecciona el género'
                  data={genders}
                  selectedKey={familyRecord.gender}
                  onSelectionChange={(value) =>
                    setRecord({
                      ...familyRecord,
                      gender: value,
                    })
                  }
                />
                {errors.gender && (
                  <div className='text-red-500 text-sm'>{errors.gender}</div>
                )}
                <Textarea
                  classNames={{ label: "text-md font-bold mt-2" }}
                  label='Condición de salud'
                  placeholder='Escriba la condición de salud del familiar'
                  value={familyRecord.notes}
                  onChange={(e) => {
                    setRecord({
                      ...familyRecord,
                      notes: e.target.value,
                    });
                    if (errors.notes) {
                      setErrors({ ...errors, notes: null });
                    }
                  }}
                  isRequired
                />
                {errors.notes && (
                  <div className='text-red-500 text-sm'>{errors.notes}</div>
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
                <div className='flex flex-row items-start'>
                  <RadioOptions
                    label='Estado clínico'
                    defaultValue={familyRecordStatus[0].value}
                    data={familyRecordStatus}
                    value={familyRecord.clinical_status}
                    onValueChange={(value) => {
                      setRecord({ ...familyRecord, clinical_status: value });
                    }}
                  />
                  <div className='ml-4'>
                    <strong>PARCIAL:</strong> Se cuenta con información
                    incompleta sobre el familiar
                    <br />
                    <strong>COMPLETO:</strong> Se cuenta con información
                    detallada sobre el familiar
                    <br />
                    <strong>SALUD DESCONOCIDA:</strong> No se tiene ningún dato
                    sobre el estado de salud del familiar
                  </div>
                </div>
                <div className='font-bold mt-4'>Diagnóstico</div>
                {diagnoses.map((diagnosis, index) => (
                  <div key={diagnosis.id} className='mb-4'>
                    <AutocompleteLg
                      labelPlacement='outside'
                      isDisabled={false}
                      label={`Código diagnóstico ${index + 1}`}
                      placeholder='Seleccione diagnóstico principal (CIE-10)'
                      onChange={(value) =>
                        handleDiagnosisChange(diagnosis.id, "code", value)
                      }
                      data={(
                        cieCodes as { code: string; description: string }[]
                      ).map((cie10) => ({
                        value: cie10.code,
                        label: cie10.code + "-" + cie10.description,
                      }))}
                    />
                    <CustomAutocomplete
                      isDisabled={false}
                      label='Tipo de diagnostico'
                      labelPlacement='outside'
                      placeholder='Selecciona el tipo de diagnóstico'
                      data={typeOfDiagnosis}
                      selectedKey={diagnosis.type}
                      onSelectionChange={(value) =>
                        handleDiagnosisChange(diagnosis.id, "type", value)
                      }
                    />
                    <Input
                      label='Descripción'
                      placeholder='Escriba una descripción del diagnóstico'
                      value={diagnosis.description}
                      onChange={(e) =>
                        handleDiagnosisChange(
                          diagnosis.id,
                          "description",
                          e.target.value
                        )
                      }
                    />
                    {index > 0 && (
                      <Button
                        className='mt-2'
                        color='danger'
                        onClick={() => removeDiagnosis(diagnosis.id)}
                      >
                        Eliminar
                      </Button>
                    )}
                  </div>
                ))}

                <Button color='primary' onClick={addDiagnosis}>
                  + Agregar nuevo diagnóstico
                </Button>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
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

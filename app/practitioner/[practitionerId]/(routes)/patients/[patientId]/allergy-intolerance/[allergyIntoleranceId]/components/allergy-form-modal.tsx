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
import { allergyCategories, allergyStatus, allergyTypes } from "@/data/data";
import { useParams, useRouter } from "next/navigation";
import { v4 as uuidv4, validate } from "uuid";
import { useApi } from "@/hooks/useApi";
import allergyIntoleranceService from "@/services/allergyIntoleranceService";
import notificationsService from "@/services/notificationsService";
import { toast } from "react-toastify";

type Allergy = {
  name: string;
  category: string;
  clinical_status: string;
  recorded_date: string;
  type: string;
  allergy_notes: string;
  patient_id: string;
  participant_id: string;
};

interface AllergySelectedPractitionerProps {
  allergy: Allergy;
  allergyFormModalClose: () => void;
  formIsValid: boolean;
}

const ConfirmModal: React.FC<AllergySelectedPractitionerProps> = ({
  allergy,
  allergyFormModalClose,
  formIsValid,
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { response: createAllergyResponse, fetchData: createAllergy } =
    useApi();
  const router = useRouter();
  const params = useParams();

  const handleCreate = () => {
    allergy.recorded_date = new Date().toISOString().split("T")[0];
    const allergy_id = uuidv4();

    createAllergy(
      allergyIntoleranceService.createAllergy({
        identifier: allergy_id,
        payload: allergy,
      })
    );

    notificationsService.createNotifications({
      user_id: params.patientId,
      practitioner_id: params.practitionerId,
      register_id: allergy_id,
      register_type: "ALLERGY",
      type: "WRITE",
    }).then((response) => {
      location.reload();
      onClose();
      allergyFormModalClose();
      toast.success("Registro de alergia creado con éxito");
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
        backdrop='blur'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className='w-[700px] max-w-full'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
              Confirmación
              </ModalHeader>
              <ModalBody>
                <div>¿Estas seguro de crear este registro?</div>
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

export const AllergyFormModal = () => {
  const [allergy, setAllergy] = useState<Allergy>({} as Allergy);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const params = useParams();
  const [errors, setErrors] = useState<any>({
    name: "El nombre es requerido",
    allergy_notes: "La nota es requerida",
  });
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setAllergy({
      name: "",
      category: "FOOD",
      clinical_status: "ACTIVE",
      recorded_date: "",
      type: "DAIRY",
      allergy_notes: "",
      patient_id: params.patientId as string,
      participant_id: params.practitionerId as string,
    });
  }, [params.patientId, params.practitionerId]);

  useEffect(() => {
    validateForm();
  }, [allergy]);
 
  const validateForm = () => {
    let valid = true;
    const errors = {} as any;

    if (!allergy.name) {
      errors.name = "El nombre es requerido";
      valid = false;
    }

    if (!allergy.allergy_notes) {
      errors.allergy_notes = "La nota es requerida";
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
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className='w-[700px] max-w-full h-5/6 overflow-y-scroll'
      >
        <ModalContent>
          {(onClose) => (
            <form>
              <ModalHeader className='flex flex-col gap-1 font-bold'>
                Cuestionario de Alergias
              </ModalHeader>
              <ModalBody>
                <Input
                  label='Nombre'
                  placeholder='Complete el nombre de la alergia'
                  classNames={{ label: "text-md font-bold" }}
                  value={allergy.name}
                  onChange={(e) => {
                    setAllergy({ ...allergy, name: e.target.value });
                    if (errors.name) {
                      setErrors({ ...errors, name: null });
                    }
                  
                  }}
                  isRequired
                />
                {errors.name && (
                  <div className='text-red-500'>{errors.name}</div>
                )}
                <RadioOptions
                  label='Tipo'
                  defaultValue={allergyTypes[0].value}
                  data={allergyTypes}
                  value={allergy.type}
                  onValueChange={(value) => {
                    setAllergy({ ...allergy, type: value });
                  }}
                />
                <RadioOptions
                  label='Categoría'
                  defaultValue={allergyCategories[0].value}
                  data={allergyCategories}
                  value={allergy.category}
                  onValueChange={(value) => {
                    setAllergy({ ...allergy, category: value });
                  }}
                />
                <RadioOptions
                  label='Estado'
                  defaultValue={allergyStatus[0].value}
                  data={allergyStatus}
                  value={allergy.clinical_status}
                  onValueChange={(value) => {
                    setAllergy({ ...allergy, clinical_status: value });
                  }}
                />
                <Textarea
                  classNames={{ label: "text-md font-bold" }}
                  label='Nota'
                  placeholder='Complete la nota de la alergia'
                  value={allergy.allergy_notes}
                  onChange={(e) => {
                    setAllergy({ ...allergy, allergy_notes: e.target.value });
                    if (errors.allergy_notes) {
                      setErrors({ ...errors, allergy_notes: null });
                    }
                  }}
                  isRequired
                />
                {errors.allergy_notes && (
                  <div className='text-red-500'>{errors.allergy_notes}</div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Cancelar
                </Button>
                <ConfirmModal
                  allergy={allergy}
                  allergyFormModalClose={onClose}
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

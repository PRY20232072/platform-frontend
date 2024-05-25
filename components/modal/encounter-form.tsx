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
  RadioGroup,
  Radio,
} from "@nextui-org/react";

import { RadioOptions } from "@/components/ui/radio-options";

import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  familyRecordStatus,
  typeOfAttention,
  typeOfFacility,
  typeOfService,
  timeOfDiseasePeriod,
  timeOfDiseasePeriodUnit,
  typeOfDiagnosis,
} from "@/data/data";

import { useParams, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useApi } from "@/hooks/useApi";
import { toast } from "react-toastify";
import { CustomAutocomplete } from "@/components/ui/auto-complete";
import { CustomAutoCompleteLarge } from "@/components/ui/auto-complete-large";
import { useDebounce } from "@/hooks/useDebounce";

import cieCodes from "@/data/cie10Codes_ES.json";
import attentionService from "@/services/attentionService";
type Diagnosis = {
  id: number;
  code: string;
  description: string;
  type: string;
};

type Treatment = {
  id: number;
  description: string;
};

type AuxiliaryExam = {
  id: number;
  description: string;
};
type PatientAtention = {
  patient_id: string;
  participant_id: string;
  recorded_date: string;
  typeOfAttention: string;
  typeOfService: string;
  typeOfFacility: string;
  reasonForConsultation: string;
  observations: string;
  timeOfDisease: {
    units: number;
    period: string;
  };
  diagnoses: Diagnosis[];
  treatments: Treatment[];
  auxiliaryExams: AuxiliaryExam[];
  physicalExam: {
    head: string;
    eyes: string;
    nose: string;
    ears: string;
    throat: string;
    neck: string;
    chestAndLungs: string;
    cardiovascular: string;
    abdominal: string;
    gereatricouniary: string;
    neurological: string;
    extremities: string;
  };
  vitalSigns: {
    temperature: number;
    heartRate: number;
    respiratoryRate: number;
    bloodPressure: {
      systolic: number;
      diastolic: number;
    };
    oxygenSaturation: number;
    weight: number;
    size: number;
    imc: number;
  };
};

interface AtentionProps {
  atention: PatientAtention;
  atentionFormModalClose: () => void;
  formIsValid: boolean;
}

const ConfirmModal: React.FC<AtentionProps> = ({
  atention,
  atentionFormModalClose,
  formIsValid,
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { response: createAtentionResponse, fetchData: createAttention } =
    useApi();
  const router = useRouter();
  const params = useParams();

  const handleCreate = () => {
    const filteredDiagnoses = atention.diagnoses.map(({ id, ...rest }) => rest);
    const filteredTreatments = atention.treatments.map(
      ({ id, ...rest }) => rest
    );
    const filteredAuxiliaryExams = atention.auxiliaryExams.map(
      ({ id, ...rest }) => rest
    );
    const payload = {
      ...atention,
      diagnoses: filteredDiagnoses,
      treatments: filteredTreatments,
      auxiliaryExams: filteredAuxiliaryExams,
    };
    atention.recorded_date = new Date().toISOString().split("T")[0];
    const attention_id = uuidv4();
 
    createAttention(
      attentionService.createAttention({
        identifier: attention_id,
        payload: payload,
      })
    );
   
    location.reload();
    onClose();
    atentionFormModalClose();
    toast.success("Atención creada con éxito");
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
        Guardar
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
                <div>¿Estas seguro de crear esta atención?</div>
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

export const EncounterFormModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const params = useParams();
  const [currentDateTime, setCurrentDateTime] = useState("");
  const nhc = params.patientId.slice(0, 8);
  const [diagnoses, setDiagnoses] = useState([
    { id: 1, code: "", type: "", description: "" },
  ]);
  const [treatments, setTreatments] = useState([{ id: 1, description: "" }]);
  const [auxiliaryExams, setAuxiliaryExams] = useState([
    { id: 1, description: "" },
  ]);
  const [atention, setAtention] = useState<PatientAtention>(
    {} as PatientAtention
  );
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([] as any[]);
  const debouncedInput = useDebounce(inputValue, 300);

  /*  const cie10Data = Object.entries(cieCodes).map(([value, label]) => ({
    value,
    label,
  })); */
  /*   useEffect(() => {
    const filteredOptions = Object.entries(cieCodes)
      .filter(([key, value]) =>
        value.toLowerCase().includes(debouncedInput.toLowerCase())
      )
      .map(([value, label]) => ({ value, label }));
    setOptions(filteredOptions);
  }, [debouncedInput]); */

  useEffect(() => {
    setAtention({
      recorded_date: "",
      typeOfAttention: "IN_PERSON",
      typeOfService: "NEW",
      typeOfFacility: "NEW",
      reasonForConsultation: "",
      observations: "",
      timeOfDisease: {
        units: 1,
        period: "DAY",
      },
      diagnoses: [],
      treatments: [],
      auxiliaryExams: [],
      physicalExam: {
        head: "",
        eyes: "",
        nose: "",
        ears: "",
        throat: "",
        neck: "",
        chestAndLungs: "",
        cardiovascular: "",
        abdominal: "",
        gereatricouniary: "",
        neurological: "",
        extremities: "",
      },
      vitalSigns: {
        temperature: 0,
        heartRate: 0,
        respiratoryRate: 0,
        bloodPressure: {
          systolic: 0,
          diastolic: 0,
        },
        oxygenSaturation: 0,
        weight: 0,
        size: 0,
        imc: 0,
      },
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

  const addTreatment = () => {
    setTreatments([
      ...treatments,
      {
        id: treatments.length + 1,
        description: "",
      },
    ]);
  };

  const addAuxiliaryExam = () => {
    setAuxiliaryExams([
      ...auxiliaryExams,
      {
        id: auxiliaryExams.length + 1,
        description: "",
      },
    ]);
  };

  const removeDiagnosis = (id: any) => {
    setDiagnoses(diagnoses.filter((d) => d.id !== id));
    setAtention({
      ...atention,
      diagnoses: diagnoses.filter((d) => d.id !== id),
    });
  };

  const removeTreatment = (id: any) => {
    setTreatments(treatments.filter((t) => t.id !== id));
    setAtention({
      ...atention,
      treatments: treatments.filter((t) => t.id !== id),
    });
  };

  const removeAuxiliaryExam = (id: any) => {
    setAuxiliaryExams(auxiliaryExams.filter((a) => a.id !== id));
    setAtention({
      ...atention,
      auxiliaryExams: auxiliaryExams.filter((a) => a.id !== id),
    });
  };

  const handleDiagnosisChange = (id: any, key: any, value: any) => {
    const updatedDiagnoses = diagnoses.map((d) =>
      d.id === id ? { ...d, [key]: value } : d
    );
    setDiagnoses(updatedDiagnoses);
    setInputValue(value);
    setAtention({ ...atention, diagnoses: updatedDiagnoses });
  };

  const handleTreatmentChange = (id: any, key: any, value: any) => {
    const updatedTreatments = treatments.map((t) =>
      t.id === id ? { ...t, [key]: value } : t
    );
    setTreatments(updatedTreatments);
    setAtention({ ...atention, treatments: updatedTreatments });
  };

  const handleAuxiliaryExamChange = (id: any, key: any, value: any) => {
    const updatedAuxiliaryExams = auxiliaryExams.map((a) =>
      a.id === id ? { ...a, [key]: value } : a
    );
    setAuxiliaryExams(updatedAuxiliaryExams);
    setAtention({ ...atention, auxiliaryExams: updatedAuxiliaryExams });
  };

  const calculateBMI = (weight: number, height: number) => {
    if (weight && height) {
      return Number((weight / (height / 100) ** 2).toFixed(3));
    }
    return 0;
  };
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const weight = parseFloat(e.target.value);
    const height = atention.vitalSigns.size;
    setAtention({
      ...atention,
      vitalSigns: {
        ...atention.vitalSigns,
        weight,
        imc: calculateBMI(weight, height),
      },
    });
  };
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const height = parseFloat(e.target.value);
    const weight = atention.vitalSigns.weight;
    setAtention({
      ...atention,
      vitalSigns: {
        ...atention.vitalSigns,
        size: height,
        imc: calculateBMI(weight, height),
      },
    });
  };

  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      const formattedDateTime = now
        .toLocaleString("es-ES", { hour12: false })
        .replace(", ", " ");
      setCurrentDateTime(formattedDateTime);
      setAtention((prev) => ({ ...prev, recorded_date: formattedDateTime }));
    }
  }, [isOpen]);
  console.log('Atention', atention);
  
 
  return (
    <div className='items-stretch justify-end gap-4 inline-flex mb-3'>
      <Button
        onPress={onOpen}
        className='text-white bg-blue-600 px-4 rounded-xl justify-center items-center gap-3 flex'
      >
        Añadir nuevo <Plus className='h-4 w-4' />
      </Button>
      <Modal
        size='xl'
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
                Cuestionario atención ambulatoria
              </ModalHeader>
              <ModalBody>
                <div className='flex justify-between'>
                  <div>
                    <span className='font-bold'>NHC:</span> {nhc}
                  </div>
                  <div>
                    <span className='font-bold'>Fecha y hora atención:</span>
                    {currentDateTime}
                  </div>
                </div>

                <div className='mt-4'>
                  <label className='font-bold'>Atención</label>
                  <RadioOptions
                    label='Tipo de atención'
                    defaultValue={typeOfAttention[0].value}
                    data={typeOfAttention}
                    value={atention.typeOfAttention}
                    onValueChange={(value) => {
                      setAtention({ ...atention, typeOfAttention: value });
                    }}
                  />
                </div>
                <div className='mt-4 flex'>
                  <div className='flex flex-col mr-4'>
                    <RadioOptions
                      label='Tipo de servicio'
                      defaultValue={typeOfService[0].value}
                      data={typeOfService}
                      value={atention.typeOfService}
                      onValueChange={(value) => {
                        setAtention({ ...atention, typeOfService: value });
                      }}
                    />
                  </div>
                  <div className='flex flex-col mr-4'>
                    <RadioOptions
                      label='Tipo de establecimiento'
                      defaultValue={typeOfFacility[0].value}
                      data={typeOfFacility}
                      value={atention.typeOfFacility}
                      onValueChange={(value) => {
                        setAtention({ ...atention, typeOfFacility: value });
                      }}
                    />
                  </div>
                  <div className='flex flex-col justify-start'>
                    <div className='mt-2'>
                      Leyenda: <br />
                      N: Nuevo C: Continuador R: Reingreso
                    </div>
                  </div>
                </div>
                
                <div className='font-bold mt-4'>Anamnesis</div>
                <div className='mt-4 flex'>
                  <div className='flex flex-col mr-4'>
                    <Input
                      type='number'
                      labelPlacement='outside'
                      label='Tiempo de la enfermedad'
                      placeholder='Ingresa el tiempo de la enfermedad'
                      value={atention.timeOfDisease.units.toString()}
                      onChange={(e) =>
                        setAtention({
                          ...atention,
                          timeOfDisease: {
                            ...atention.timeOfDisease,
                            units: parseFloat(e.target.value),
                          },
                        })
                      }
                      isRequired
                    />
                  </div>
                  <div className='flex flex-col'>
                    <CustomAutocomplete
                      isDisabled={false}
                      label='Periodo'
                      labelPlacement='outside'
                      placeholder='Selecciona el periodo'
                      data={
                        atention.timeOfDisease.units > 1
                          ? timeOfDiseasePeriod
                          : timeOfDiseasePeriodUnit
                      }
                      selectedKey={atention.timeOfDisease.period}
                      onSelectionChange={(value) =>
                        setAtention({
                          ...atention,
                          timeOfDisease: {
                            ...atention.timeOfDisease,
                            period: value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
                <Textarea
                  label='Enfermedad actual y motivo de la consulta'
                  placeholder='Ingresa el motivo de la consulta'
                  value={atention.reasonForConsultation}
                  onChange={(e) =>
                    setAtention({
                      ...atention,
                      reasonForConsultation: e.target.value,
                    })
                  }
                  isRequired
                />

                <Textarea
                  label='Observaciones'
                  placeholder='Ingresa observaciones de la atención'
                  value={atention.observations}
                  onChange={(e) =>
                    setAtention({ ...atention, observations: e.target.value })
                  }
                />
                <div className='font-bold mt-4'>Signos vitales</div>
                <div className='grid grid-cols-2 gap-4'>
                  <Input
                    type='number'
                    label='Temperatura (°C)'
                    placeholder='0'
                    value={atention.vitalSigns.temperature.toString()}
                    onChange={(e) =>
                      setAtention({
                        ...atention,
                        vitalSigns: {
                          ...atention.vitalSigns,
                          temperature: parseFloat(e.target.value),
                        },
                      })
                    }
                  />
                  <Input
                    type='number'
                    label='Frecuencia cardíaca (lpm)'
                    placeholder='Ingresa la frecuencia cardíaca'
                    value={atention.vitalSigns.heartRate.toString()}
                    onChange={(e) =>
                      setAtention({
                        ...atention,
                        vitalSigns: {
                          ...atention.vitalSigns,
                          heartRate: parseFloat(e.target.value),
                        },
                      })
                    }
                  />
                  <Input
                    type='number'
                    label='Frecuencia respiratoria (rpm)'
                    placeholder='Ingresa la frecuencia respiratoria'
                    value={atention.vitalSigns.respiratoryRate.toString()}
                    onChange={(e) =>
                      setAtention({
                        ...atention,
                        vitalSigns: {
                          ...atention.vitalSigns,
                          respiratoryRate: parseFloat(e.target.value),
                        },
                      })
                    }
                  />
                  <Input
                    type='number'
                    label='Presión arterial sistólica (mm Hg)'
                    placeholder='Ingresa la presión arterial sistólica'
                    value={atention.vitalSigns.bloodPressure.systolic.toString()}
                    onChange={(e) =>
                      setAtention({
                        ...atention,
                        vitalSigns: {
                          ...atention.vitalSigns,
                          bloodPressure: {
                            ...atention.vitalSigns.bloodPressure,
                            systolic: parseInt(e.target.value),
                          },
                        },
                      })
                    }
                  />
                  <Input
                    type='number'
                    label='Presión arterial diastólica (mm Hg)'
                    placeholder='Ingresa la presión arterial diastólica'
                    value={atention.vitalSigns.bloodPressure.diastolic.toString()}
                    onChange={(e) =>
                      setAtention({
                        ...atention,
                        vitalSigns: {
                          ...atention.vitalSigns,
                          bloodPressure: {
                            ...atention.vitalSigns.bloodPressure,
                            diastolic: parseInt(e.target.value),
                          },
                        },
                      })
                    }
                  />
                  <Input
                    type='number'
                    label='Saturación de oxígeno (%)'
                    placeholder='Ingresa la saturación de oxígeno'
                    value={atention.vitalSigns.oxygenSaturation.toString()}
                    onChange={(e) =>
                      setAtention({
                        ...atention,
                        vitalSigns: {
                          ...atention.vitalSigns,
                          oxygenSaturation: parseFloat(e.target.value),
                        },
                      })
                    }
                  />
                  <Input
                    type='number'
                    label='Peso (kg)'
                    placeholder='Ingresa el peso'
                    value={atention.vitalSigns.weight.toString()}
                    onChange={handleWeightChange}
                  />
                  <Input
                    type='number'
                    label='Tamaño (cm)'
                    placeholder='Ingresa el tamaño'
                    value={atention.vitalSigns.size.toString()}
                    onChange={handleHeightChange}
                  />
                  <Input
                    type='number'
                    label='IMC'
                    placeholder='IMC'
                    value={atention.vitalSigns.imc.toString()}
                    readOnly
                  />
                </div>
                

                <div className='font-bold mt-4'>Examen físico</div>
                <Input
                  label='Cabeza'
                  placeholder='Ingresa el estado de la cabeza'
                  value={atention.physicalExam.head}
                  onChange={(e) =>
                    setAtention({
                      ...atention,
                      physicalExam: {
                        ...atention.physicalExam,
                        head: e.target.value,
                      },
                    })
                  }
                />
                <Input
                  label='Ojos'
                  placeholder='Ingresa el estado de los ojos'
                  value={atention.physicalExam.eyes}
                  onChange={(e) =>
                    setAtention({
                      ...atention,
                      physicalExam: {
                        ...atention.physicalExam,
                        eyes: e.target.value,
                      },
                    })
                  }
                />
                <Input
                  label='Nariz'
                  placeholder='Ingresa el estado de la nariz'
                  value={atention.physicalExam.nose}
                  onChange={(e) =>
                    setAtention({
                      ...atention,
                      physicalExam: {
                        ...atention.physicalExam,
                        nose: e.target.value,
                      },
                    })
                  }
                />
                <Input
                  label='Oídos'
                  placeholder='Ingresa el estado de los oídos'
                  value={atention.physicalExam.ears}
                  onChange={(e) =>
                    setAtention({
                      ...atention,
                      physicalExam: {
                        ...atention.physicalExam,
                        ears: e.target.value,
                      },
                    })
                  }
                />
                <Input
                  label='Garganta'
                  placeholder='Ingresa el estado de la garganta'
                  value={atention.physicalExam.throat}
                  onChange={(e) =>
                    setAtention({
                      ...atention,
                      physicalExam: {
                        ...atention.physicalExam,
                        throat: e.target.value,
                      },
                    })
                  }
                />
                <Input
                  label='Cuello'
                  placeholder='Ingresa el estado del cuello'
                  value={atention.physicalExam.neck}
                  onChange={(e) =>
                    setAtention({
                      ...atention,
                      physicalExam: {
                        ...atention.physicalExam,
                        neck: e.target.value,
                      },
                    })
                  }
                />
                <Input
                  label='Torax y pulmones'
                  placeholder='Ingresa el estado del torax y pulmones'
                  value={atention.physicalExam.chestAndLungs}
                  onChange={(e) =>
                    setAtention({
                      ...atention,
                      physicalExam: {
                        ...atention.physicalExam,
                        chestAndLungs: e.target.value,
                      },
                    })
                  }
                />
                <Input
                  label='Cardiovascular'
                  placeholder='Ingresa el estado cardiovascular'
                  value={atention.physicalExam.cardiovascular}
                  onChange={(e) =>
                    setAtention({
                      ...atention,
                      physicalExam: {
                        ...atention.physicalExam,
                        cardiovascular: e.target.value,
                      },
                    })
                  }
                />
                <Input
                  label='Abdomen'
                  placeholder='Ingresa el estado del abdomen'
                  value={atention.physicalExam.abdominal}
                  onChange={(e) =>
                    setAtention({
                      ...atention,
                      physicalExam: {
                        ...atention.physicalExam,
                        abdominal: e.target.value,
                      },
                    })
                  }
                />
                <Input
                  label='Genitourinario'
                  placeholder='Ingresa el estado genitourinario'
                  value={atention.physicalExam.gereatricouniary}
                  onChange={(e) =>
                    setAtention({
                      ...atention,
                      physicalExam: {
                        ...atention.physicalExam,
                        gereatricouniary: e.target.value,
                      },
                    })
                  }
                />
                <Input
                  label='Neurológico'
                  placeholder='Ingresa el estado neurológico'
                  value={atention.physicalExam.neurological}
                  onChange={(e) =>
                    setAtention({
                      ...atention,
                      physicalExam: {
                        ...atention.physicalExam,
                        neurological: e.target.value,
                      },
                    })
                  }
                />
                <Input
                  label='Extremidades'
                  placeholder='Ingresa el estado de las extremidades'
                  value={atention.physicalExam.extremities}
                  onChange={(e) =>
                    setAtention({
                      ...atention,
                      physicalExam: {
                        ...atention.physicalExam,
                        extremities: e.target.value,
                      },
                    })
                  }
                />

                <div className='font-bold mt-4'>Diagnóstico</div>
                {diagnoses.map((diagnosis, index) => (
                  <div key={diagnosis.id} className='mb-4'>
                    <CustomAutoCompleteLarge
                      labelPlacement='outside'
                      isDisabled={false}
                      label='Diagnóstico'
                      placeholder='Seleccione diagnóstico principal (CIE-10)'
                      data={(
                        cieCodes as { code: string; description: string }[]
                      ).map((cie10) => ({
                        value: cie10.code,
                        label: cie10.code + "-" + cie10.description,
                      }))}
                      selectedKey={diagnosis.code}
                      onSelectionChange={(value) =>
                        handleDiagnosisChange(diagnosis.id, "code", value)
                      }
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

                <div className='font-bold mt-4'>Tratamiento</div>
                {treatments.map((treatment, index) => (
                  <div key={treatment.id} className='mb-4'>
                    <Input
                      label={`Prescripción  ${index + 1}`}
                      labelPlacement='outside'
                      placeholder='Escriba una descripción del tratamiento'
                      value={treatment.description}
                      onChange={(e) =>
                        handleTreatmentChange(
                          treatment.id,
                          "description",
                          e.target.value
                        )
                      }
                    />
                    {index > 0 && (
                      <Button
                        color='danger'
                        onClick={() => removeTreatment(treatment.id)}
                      >
                        Eliminar
                      </Button>
                    )}
                  </div>
                ))}
                <Button color='primary' onClick={addTreatment}>
                  + Agregar nuevo tratamiento
                </Button>

                <div className='font-bold mt-4'>Exámenes auxiliares</div>
                {auxiliaryExams.map((auxiliaryExam, index) => (
                  <div key={auxiliaryExam.id} className='mb-4'>
                    <Input
                      label={`Examen   ${index + 1}`}
                      labelPlacement="outside"
                      placeholder='Escriba una descripción del examen auxiliar'
                      value={auxiliaryExam.description}
                      onChange={(e) =>
                        handleAuxiliaryExamChange(
                          auxiliaryExam.id,
                          "description",
                          e.target.value
                        )
                      }
                    />
                    {index > 0 && (
                      <Button
                        color='danger'
                        onClick={() => removeAuxiliaryExam(auxiliaryExam.id)}
                      >
                        Eliminar
                      </Button>
                    )}
                  </div>
                ))}
                <Button color='primary' onClick={addAuxiliaryExam}>
                  + Agregar nuevo examen auxiliar
                </Button>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Cancelar
                </Button>
                <ConfirmModal
                  atention={atention}
                  atentionFormModalClose={onClose}
                  formIsValid={true}
                />
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

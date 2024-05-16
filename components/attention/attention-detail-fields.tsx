import { CustomAutocomplete } from "@/components/ui/auto-complete";
import {
  typeOfAttention,
  typeOfFacility,
  typeOfService,
} from "@/data/data";
import { Input } from "@nextui-org/input";
import { useSession } from "next-auth/react";

type VitalSigns = {
  temperature: number;
  heartRate: number;
  respiratoryRate: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  oxygenSaturation: number;
  weight: number;
};

type Diagnosis = {
  code: string;
  description: string;
};

type Attention = {
  attention_id: string;
  patient_id: string;
  participant_id: string;
  recorded_date: string;
  typeOfAttention: string;
  typeOfService: string;
  typeOfFacility: string;
  nameOfConsultation: string;
  typeOfConsultation: string;
  reasonForConsultation: string;
  observations: string;
  diagnoses: Diagnosis[];
  vitalSigns: VitalSigns;
};

interface AttentionDetailsProps {
  attention: Attention;
  isEditing: boolean;
  handleInputChange: (key: string, value: any) => void;
}

export default function AttentionDetailFields({
  attention,
  isEditing,
  handleInputChange,
}: AttentionDetailsProps) {
  const { data: session } = useSession();

  return (
    attention.vitalSigns && (
      <div className="flex flex-col gap-5">
        <div className="flex max-md:flex-col gap-5">
          <Input
            isReadOnly={true}
            type="text"
            label="Paciente"
            labelPlacement="outside"
            value={session?.user?.name as string}
          />
          <Input
            isReadOnly={true}
            type="text"
            label="ID"
            labelPlacement="outside"
            value={session?.user?.id as string}
          />
        </div>
        <div className="flex max-md:flex-col gap-5">
          <CustomAutocomplete
            isDisabled={true}
            label="Tipo de atención"
            labelPlacement="outside"
            data={typeOfAttention}
            selectedKey={attention.typeOfAttention}
          />
          <Input
            isReadOnly={true}
            type="date"
            label="Fecha de registro"
            labelPlacement="outside"
            value={attention.recorded_date}
          />
        </div>
        <div className="flex flex-col gap-5">
          <p className="w-full font-bold">Signos vitales</p>
          <div className="flex gap-5">
            <Input
              isReadOnly={true}
              type="text"
              label="Temperatura"
              labelPlacement="outside"
              value={`${+attention.vitalSigns.temperature} C°`}
            />
            <Input
              isReadOnly={true}
              type="text"
              label="Frecuencia cardíaca"
              labelPlacement="outside"
              value={`${+attention.vitalSigns.heartRate} lpm`}
            />
            <Input
              isReadOnly={true}
              type="text"
              label="Frecuencia respiratoria"
              // labelPlacement="outside"
              value={`${+attention.vitalSigns.respiratoryRate} SatO2`}
            />
          </div>
          <div className="flex gap-5">
            <Input
              isReadOnly={true}
              type="text"
              label="Peso"
              labelPlacement="outside"
              value={`${+attention.vitalSigns.weight} KG`}
            />
            <Input
              isReadOnly={true}
              type="text"
              label="Presión arterial"
              labelPlacement="outside"
              value={`${+attention.vitalSigns.bloodPressure.systolic}/${
                +attention.vitalSigns.bloodPressure.diastolic
              } mmHg`}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="w-full font-bold">Tipo de paciente</p>
          <div className="flex gap-5">
            <CustomAutocomplete
              isDisabled={!isEditing}
              label="Servicio"
              labelPlacement="outside"
              data={typeOfService}
              selectedKey={attention.typeOfService}
              onSelectionChange={(value) =>
                handleInputChange("typeOfService", value)
              }
            />
            <CustomAutocomplete
              isDisabled={!isEditing}
              label="Establecimiento"
              labelPlacement="outside"
              data={typeOfFacility}
              selectedKey={attention.typeOfFacility}
              onSelectionChange={(value) =>
                handleInputChange("typeOfFacility", value)
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="w-full font-bold">Consulta</p>
          <div className="flex flex-col gap-5">
            <Input
              isReadOnly={!isEditing}
              type="text"
              label="Nombre de la consulta"
              labelPlacement="outside"
              value={attention.nameOfConsultation}
              onChange={(e) =>
                handleInputChange("nameOfConsultation", e.target.value)
              }
            />
            <Input
              isReadOnly={!isEditing}
              type="text"
              label="Enfermedad actual y motivo de la consulta"
              labelPlacement="outside"
              value={attention.reasonForConsultation}
              onChange={(e) =>
                handleInputChange("reasonForConsultation", e.target.value)
              }
            />
            <Input
              isReadOnly={!isEditing}
              type="text"
              label="Observaciones"
              labelPlacement="outside"
              value={attention.observations}
              onChange={(e) =>
                handleInputChange("observations", e.target.value)
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="w-full font-bold">Diagnóstico</p>
          <div className="flex flex-col gap-5">
            {attention.diagnoses &&
              attention.diagnoses.map((diagnosis, index) => (
                <div key={index} className="flex gap-5">
                  <Input
                    isReadOnly={!isEditing}
                    type="text"
                    label="Código"
                    labelPlacement="outside"
                    value={diagnosis.code}
                    onChange={(e) =>
                      handleInputChange(
                        `diagnoses.${index}.code`,
                        e.target.value
                      )
                    }
                  />
                  <Input
                    isReadOnly={!isEditing}
                    type="text"
                    label="Descripción"
                    labelPlacement="outside"
                    value={diagnosis.description}
                    onChange={(e) =>
                      handleInputChange(
                        `diagnoses.${index}.description`,
                        e.target.value
                      )
                    }
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  );
}

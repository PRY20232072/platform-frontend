import { CustomAutocomplete } from "@/components/ui/auto-complete";
import {
  typeOfAttention,
  typeOfFacility,
  typeOfService,
  typeOfDiagnosis,
} from "@/data/data";
import { Attention } from "@/types/attention";
import { Input } from "@nextui-org/input";
import { Textarea } from "@nextui-org/react";
import { useSession } from "next-auth/react";

interface AttentionDetailsProps {
  attention: Attention;
  isEditing: boolean;
  handleInputChange: (key: string, value: any) => void;
}

const periodMap: Record<string, string> = {
  DAYS: "días",
  WEEKS: "semanas",
  MONTHS: "meses",
  YEARS: "años",
};

const periodUnitMap: Record<string, string> = {
  DAY: "día",
  WEEK: "semana",
  MONTH: "mes",
  YEAR: "año",
};

export default function AttentionDetailFields({
  attention,
  isEditing,
  handleInputChange,
}: AttentionDetailsProps) {
  const { data: session } = useSession();
  return (
    attention.vitalSigns && (
      <div className='flex flex-col gap-5'>
        <div className='flex max-md:flex-col gap-5'>
          <Input
            isReadOnly={true}
            type='text'
            label='Paciente'
            labelPlacement='outside'
            value={session?.user?.name as string}
          />
          <Input
            isReadOnly={true}
            type='text'
            label='ID'
            labelPlacement='outside'
            value={session?.user?.id as string}
          />
        </div>
        <div className='flex max-md:flex-col gap-5'>
          <CustomAutocomplete
            isDisabled={true}
            label='Tipo de atención'
            labelPlacement='outside'
            data={typeOfAttention}
            selectedKey={attention.typeOfAttention}
          />
          <Input
            isReadOnly={true}
            type='datetime'
            label='Fecha de registro'
            labelPlacement='outside'
            value={attention.recorded_date}
          />
        </div>
        <div className='flex flex-col gap-5'>
          <p className='w-full font-bold'>Signos vitales</p>
          <div className='flex gap-5'>
            <Input
              isReadOnly={true}
              type='text'
              label='Peso'
              labelPlacement='outside'
              value={`${+attention.vitalSigns.weight} KG`}
            />
            <Input
              isReadOnly={true}
              type='text'
              label='Talla'
              labelPlacement='outside'
              value={`${+attention.vitalSigns.size} cm`}
            />
            <Input
              isReadOnly={true}
              type='text'
              label='Índice de masa corporal (IMC)'
              labelPlacement='outside'
              value={`${+attention.vitalSigns.imc}`}
            />
          </div>
          <div className='flex gap-5'>
            <Input
              isReadOnly={true}
              type='text'
              label='Temperatura'
              labelPlacement='outside'
              value={`${+attention.vitalSigns.temperature} C°`}
            />
            <Input
              isReadOnly={true}
              type='text'
              label='Frecuencia cardíaca'
              labelPlacement='outside'
              value={`${+attention.vitalSigns.heartRate} lpm`}
            />
            <Input
              isReadOnly={true}
              type='text'
              label='Frecuencia respiratoria'
              labelPlacement='outside'
              value={`${+attention.vitalSigns.respiratoryRate} rpm`}
            />
          </div>
          <div className='flex gap-5'>
            <Input
              isReadOnly={true}
              type='text'
              label='Saturación de oxígeno'
              labelPlacement='outside'
              value={`${+attention.vitalSigns.oxygenSaturation} SpO2%`}
            />
            <Input
              isReadOnly={true}
              type='text'
              label='Presión arterial'
              labelPlacement='outside'
              value={`${+attention.vitalSigns.bloodPressure
                .systolic}/${+attention.vitalSigns.bloodPressure
                .diastolic} mmHg`}
            />
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <p className='w-full font-bold'>Examen físico</p>
          <Textarea
            disableAutosize
            isReadOnly={!isEditing}
            label='Cabeza: '
            labelPlacement='outside'
            value={attention.physicalExam.head}
          />
          <Textarea
            disableAutosize
            isReadOnly={!isEditing}
            label='Ojos: '
            labelPlacement='outside'
            value={attention.physicalExam.eyes}
          />
          <Textarea
            disableAutosize
            isReadOnly={!isEditing}
            label='Nariz: '
            labelPlacement='outside'
            value={attention.physicalExam.nose}
          />
          <Textarea
            disableAutosize
            isReadOnly={!isEditing}
            label='Oídos: '
            labelPlacement='outside'
            value={attention.physicalExam.ears}
          />
          <Textarea
            disableAutosize
            isReadOnly={!isEditing}
            label='Garganta: '
            labelPlacement='outside'
            value={attention.physicalExam.throat}
          />
          <Textarea
            disableAutosize
            isReadOnly={!isEditing}
            label='Cuello: '
            labelPlacement='outside'
            value={attention.physicalExam.neck}
          />
          <Textarea
            disableAutosize
            isReadOnly={!isEditing}
            label='Tórax y pulmones: '
            labelPlacement='outside'
            value={attention.physicalExam.chestAndLungs}
          />
          <Textarea
            disableAutosize
            isReadOnly={!isEditing}
            label='Cardiovascular: '
            labelPlacement='outside'
            value={attention.physicalExam.cardiovascular}
          />
          <Textarea
            disableAutosize
            isReadOnly={!isEditing}
            label='Abdominal: '
            labelPlacement='outside'
            value={attention.physicalExam.abdominal}
          />
          <Textarea
            disableAutosize
            isReadOnly={!isEditing}
            label='Geriátrico y urinario: '
            labelPlacement='outside'
            value={attention.physicalExam.gereatricouniary}
          />
          <Textarea
            disableAutosize
            isReadOnly={!isEditing}
            label='Neurológico: '
            labelPlacement='outside'
            value={attention.physicalExam.neurological}
          />
          <Textarea
            disableAutosize
            isReadOnly={!isEditing}
            label='Extremidades: '
            labelPlacement='outside'
            value={attention.physicalExam.extremities}
          />
        </div>
        <div className='flex flex-col gap-5'>
          <p className='w-full font-bold'>Tipo de paciente</p>
          <div className='flex gap-5'>
            <CustomAutocomplete
              isDisabled={!isEditing}
              label='Servicio'
              labelPlacement='outside'
              data={typeOfService}
              selectedKey={attention.typeOfService}
              onSelectionChange={(value) =>
                handleInputChange("typeOfService", value)
              }
            />
            <CustomAutocomplete
              isDisabled={!isEditing}
              label='Establecimiento'
              labelPlacement='outside'
              data={typeOfFacility}
              selectedKey={attention.typeOfFacility}
              onSelectionChange={(value) =>
                handleInputChange("typeOfFacility", value)
              }
            />
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <p className='w-full font-bold'>Consulta</p>
          <div className='flex flex-col gap-5'>
            <Input
              isReadOnly={!isEditing}
              type='text'
              label='Tiempo de enfermedad'
              labelPlacement='outside'
              value={
                attention.timeOfDisease.units > 1
                  ? attention.timeOfDisease.units +
                    " " +
                    periodMap[attention.timeOfDisease.period]
                  : attention.timeOfDisease.units +
                    " " +
                    periodUnitMap[attention.timeOfDisease.period]
              }
            />
            <Textarea
              isReadOnly={!isEditing}
              label='Enfermedad actual y motivo de la consulta'
              labelPlacement='outside'
              value={attention.reasonForConsultation}
              onChange={(e) =>
                handleInputChange("reasonForConsultation", e.target.value)
              }
            />
            <Textarea
              isReadOnly={!isEditing}
              label='Observaciones'
              labelPlacement='outside'
              value={attention.observations}
              onChange={(e) =>
                handleInputChange("observations", e.target.value)
              }
            />
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <p className='w-full font-bold'>Diagnóstico</p>
          <div className='flex flex-col gap-5'>
            {attention.diagnoses &&
              attention.diagnoses.map((diagnosis, index) => (
                <div key={index} className='flex gap-5'>
                  <Input
                    isReadOnly={!isEditing}
                    type='text'
                    label='Código'
                    labelPlacement='outside'
                    value={diagnosis.code}
                  />
                  <Input
                    isReadOnly={!isEditing}
                    type='text'
                    label='Descripción'
                    labelPlacement='outside'
                    value={diagnosis.description}
                  />
                  <CustomAutocomplete
                    isDisabled={true}
                    label='Situación'
                    labelPlacement='outside'
                    data={typeOfDiagnosis}
                    selectedKey={diagnosis.type}
                  />
                </div>
              ))}
          </div>
        </div>

        <div className='flex flex-col gap-5'>
          <p className='w-full font-bold'>Tratamiento</p>
          <div className='flex flex-col gap-5'>
            {attention.treatments &&
              attention.treatments.map((treatment, index) => (
                <div key={index} className='flex gap-5'>
                  <Textarea
                    isReadOnly={!isEditing}
                    label='Descripción'
                    labelPlacement='outside'
                    value={treatment.description}
                  />
                </div>
              ))}
          </div>
        </div>

        <div className='flex flex-col gap-5'>
          <p className='w-full font-bold'>Examenes auxiliares</p>
          <div className='flex flex-col gap-5'>
            {attention.auxiliaryExams &&
              attention.auxiliaryExams.map((exam, index) => (
                <div key={index} className='flex gap-5'>
                  <Textarea
                    isReadOnly={!isEditing}
                    label='Descripción'
                    labelPlacement='outside'
                    value={exam.description}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  );
}

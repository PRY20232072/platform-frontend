import { CustomAutocomplete } from "@/components/ui/auto-complete";
import {
  familyRecordStatus,
  genders,
  relationships,
  typeOfDiagnosis,
} from "@/data/data";
import { Input, Textarea } from "@nextui-org/react";
import { CustomAutoCompleteLarge } from "../ui/auto-complete-large";
import cieCodes from "@/data/cie10Codes_ES.json";
import { Key } from "react";
import AutocompleteLg from "../ui/auto-complete-lg";

interface FamilyRecordDetailsProps {
  familyRecord: any;
  isEditing: boolean;
  handleInputChange: (key: string, value: any) => void;
}

export default function FamilyRecordDetailFields({
  familyRecord,
  isEditing,
  handleInputChange,
}: FamilyRecordDetailsProps) {

  const getCieCodeValue = (code: string) => {
    const cieCode = (cieCodes as { code: string; description: string }[]).find(
      (c) => c.code === code
    );

    return cieCode ? cieCode.code + " - " + cieCode.description : '';
  }

  return (
    <div className='gap-5 flex flex-col items-stretch'>
      <div className='flex flex-col items-stretch w-full'>
        <Input
          isReadOnly={!isEditing}
          className='mb-4'
          type='text'
          label='Nombre del familiar'
          labelPlacement='outside'
          value={familyRecord.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />

        <Input
          isReadOnly={!isEditing}
          type='date'
          label='Fecha de nacimiento'
          labelPlacement='outside'
          placeholder='MM-DD-YYYY'
          value={familyRecord.relativeBirthdate}
          onChange={(e) =>
            handleInputChange("relativeBirthdate", e.target.value)
          }
        />
      </div>
      <CustomAutocomplete
        isDisabled={!isEditing}
        label='Estado clínico'
        labelPlacement='outside'
        data={familyRecordStatus}
        selectedKey={familyRecord.clinical_status}
        onSelectionChange={(value) =>
          handleInputChange("clinical_status", value)
        }
      />
      <CustomAutocomplete
        isDisabled={!isEditing}
        label='Parentesco'
        labelPlacement='outside'
        data={relationships}
        selectedKey={familyRecord.relationship}
        onSelectionChange={(value) => handleInputChange("relationship", value)}
      />

      <CustomAutocomplete
        isDisabled={!isEditing}
        label='Género'
        labelPlacement='outside'
        data={genders}
        selectedKey={familyRecord.gender}
        onSelectionChange={(value) => handleInputChange("gender", value)}
      />

      <Textarea
        isReadOnly={!isEditing}
        disableAnimation
        disableAutosize
        classNames={{ input: "resize-y min-h-[40px]" }}
        label='Condición'
        labelPlacement='outside'
        value={familyRecord.notes}
        onChange={(e) => handleInputChange("notes", e.target.value)}
      />
      <div className='flex flex-col items-stretch w-full'>
        <label className='mb-2'>Diagnósticos</label>
        {(familyRecord.diagnoses || []).map((diagnosis: any, index: any) => (
          <div key={index} className='mb-4'>
            <AutocompleteLg
              isDisabled={!isEditing}
              labelPlacement='outside'
              label={`Código diagnóstico ${index + 1}`}
              placeholder='Seleccione diagnóstico principal (CIE-10)'
              onChange={(value) =>
                handleInputChange(`diagnoses[${index}].code`, value)
              }
              data={(cieCodes as { code: string; description: string }[]).map(
                (cie10) => ({
                  value: cie10.code,
                  label: cie10.code + "-" + cie10.description,
                })
              )}
              value={getCieCodeValue(diagnosis.code) || ""}
            />

            <CustomAutocomplete
              isDisabled={!isEditing}
              label='Tipo de diagnostico'
              labelPlacement='outside'
              data={typeOfDiagnosis}
              selectedKey={diagnosis.type}
              onSelectionChange={(value) =>
                handleInputChange(`diagnoses[${index}].type`, value)
              }
            />
            <Textarea
              isReadOnly={!isEditing}
              disableAnimation
              disableAutosize
              classNames={{ input: "resize-y min-h-[40px]" }}
              label={"Descripción del diagnóstico "}
              labelPlacement='outside'
              value={diagnosis.description}
              onChange={(e) =>
                handleInputChange(
                  `diagnoses[${index}].description`,
                  e.target.value
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

import { CustomAutocomplete } from "@/components/ui/auto-complete";
import { familyRecordStatus, genders, relationships } from "@/data/data";
import { Input, Textarea } from "@nextui-org/react";

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
      </div>
      <CustomAutocomplete
        isDisabled={!isEditing}
        label='Parentesco'
        labelPlacement='outside'
        data={relationships}
        selectedKey={familyRecord.relationship}
        onSelectionChange={(value) => handleInputChange("relationship", value)}
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

      <Input
        isReadOnly={!isEditing}
        type='date'
        label='Fecha de nacimiento'
        labelPlacement='outside'
        placeholder='MM-DD-YYYY'
        value={familyRecord.relativeBirthdate}
        onChange={(e) => handleInputChange("relativeBirthdate", e.target.value)}
      />
    </div>
  );
}

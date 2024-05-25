import { CustomAutocomplete } from "@/components/ui/auto-complete";
import { allergyCategories, allergyCriticality, allergyStatus, allergyTypes } from "@/data/data";
import { Input, Textarea } from "@nextui-org/react";

interface AllergyDetailsProps {
  allergy: any;
  isEditing: boolean;
  handleInputChange: (key: string, value: any) => void;
}

export default function AllergyDetailFields({
  allergy,
  isEditing,
  handleInputChange,
}: AllergyDetailsProps) {
  return (
    <div className='gap-5 flex flex-col items-stretch'>
      <div className='flex flex-col items-stretch w-full'>
        <Input
          isRequired
          isReadOnly={!isEditing}
          className='mb-4'
          type='text'
          label='Descripción de la alergia'
          labelPlacement='outside'
          value={allergy.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />

        <CustomAutocomplete
          isDisabled={!isEditing}
          label='Categoría'
          labelPlacement='outside'
          data={allergyCategories}
          selectedKey={allergy.category}
          onSelectionChange={(value) => handleInputChange("category", value)}
        />
      </div>
      <CustomAutocomplete
        isDisabled={!isEditing}
        label='Estado clínico'
        labelPlacement='outside'
        data={allergyStatus}
        selectedKey={allergy.clinical_status}
        onSelectionChange={(value) =>
          handleInputChange("clinical_status", value)
        }
      />

      <CustomAutocomplete
        isDisabled={!isEditing}
        label='Tipo de alergia'
        labelPlacement='outside'
        data={allergyTypes}
        selectedKey={allergy.type}
        onSelectionChange={(value) => handleInputChange("type", value)}
      />

      <CustomAutocomplete
        isDisabled={!isEditing}
        label='Criticidad'
        labelPlacement='outside'
        data={allergyCriticality}
        selectedKey={allergy.criticality}
        onSelectionChange={(value) => handleInputChange("criticality", value)}
      />

      <Textarea
        isRequired
        isReadOnly={!isEditing}
        disableAnimation
        disableAutosize
        classNames={{ input: "resize-y min-h-[40px]" }}
        label='Reacciones presentadas'
        labelPlacement='outside'
        value={allergy.allergy_notes}
        onChange={(e) => handleInputChange("allergy_notes", e.target.value)}
      />
    </div>
  );
}

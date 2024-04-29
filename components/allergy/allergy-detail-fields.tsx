import { CustomAutocomplete } from "@/components/ui/auto-complete";
import { allergyCategories, allergyStatus, allergyTypes } from "@/data/data";
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
    <div className='gap-5 flex max-md:flex-col max-md:items-stretch'>
      <div className='flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0'>
        <Input
          isReadOnly={!isEditing}
          className='mb-4'
          type='text'
          label='Nombre'
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
      <div className='flex flex-col items-stretch w-[34%] ml-5 max-md:w-full max-md:ml-0'>
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

        <Input
          isReadOnly={!isEditing}
          type='date'
          label='Fecha de registro'
          labelPlacement='outside'
          value={allergy.recorded_date}
          onChange={(e) => handleInputChange("recorded_date", e.target.value)}
        />
      </div>
      <div className='flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0'>
        <CustomAutocomplete
          isDisabled={!isEditing}
          label='Tipo'
          labelPlacement='outside'
          data={allergyTypes}
          selectedKey={allergy.type}
          onSelectionChange={(value) => handleInputChange("type", value)}
        />

        <Textarea
          isReadOnly={!isEditing}
          disableAnimation
          disableAutosize
          classNames={{ input: "resize-y min-h-[40px]" }}
          label='Nota'
          labelPlacement='outside'
          value={allergy.allergy_notes}
          onChange={(e) => handleInputChange("allergy_notes", e.target.value)}
        />
      </div>
    </div>
  );
}

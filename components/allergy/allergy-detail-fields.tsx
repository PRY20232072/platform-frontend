import { CustomAutocomplete } from "@/components/ui/auto-complete";
import { allergyCategories, allergyStatus, allergyTypes } from "@/data/data";
import { Input, Textarea } from "@nextui-org/react";

interface AllergyDetailsProps {
  allergy: any;
  isEditing: boolean;
  handleInputChange: (key: string, value: any) => void;
  errors: any;
}

export default function AllergyDetailFields({
  allergy,
  isEditing,
  handleInputChange,
  errors,
}: AllergyDetailsProps) {
  return (
    <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
      <div className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
        <Input
          isReadOnly={!isEditing}
          className="mb-4"
          type="text"
          label="Nombre"
          labelPlacement="outside"
          value={allergy.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          errorMessage={errors.name && errors.name._errors.join(", ")}
        />

        <CustomAutocomplete
          isDisabled={!isEditing}
          label="Categoría"
          labelPlacement="outside"
          data={allergyCategories}
          selectedKey={allergy.category}
          onSelectionChange={(value) => handleInputChange("category", value)}
          errorMessage={errors.category && errors.category._errors.join(", ")}
        />
      </div>
      <div className="flex flex-col items-stretch w-[34%] ml-5 max-md:w-full max-md:ml-0">
        <CustomAutocomplete
          isDisabled={!isEditing}
          label="Estado clínico"
          labelPlacement="outside"
          data={allergyStatus}
          selectedKey={allergy.clinical_status}
          onSelectionChange={(value) =>
            handleInputChange("clinical_status", value)
          }
          errorMessage={
            errors.clinical_status && errors.clinical_status._errors.join(", ")
          }
        />

        <Input
          isReadOnly={!isEditing}
          type="date"
          label="Fecha de registro"
          labelPlacement="outside"
          value={allergy.recorded_date}
          onChange={(e) => handleInputChange("recorded_date", e.target.value)}
          errorMessage={
            errors.recorded_date && errors.recorded_date._errors.join(", ")
          }
        />
      </div>
      <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
        <CustomAutocomplete
          isDisabled={!isEditing}
          label="Tipo"
          labelPlacement="outside"
          data={allergyTypes}
          selectedKey={allergy.type}
          onSelectionChange={(value) => handleInputChange("type", value)}
          errorMessage={errors.type && errors.type._errors.join(", ")}
        />

        <Textarea
          isReadOnly={!isEditing}
          disableAnimation
          disableAutosize
          classNames={{ input: "resize-y min-h-[40px]" }}
          label="Nota"
          labelPlacement="outside"
          value={allergy.allergy_notes}
          onChange={(e) => handleInputChange("allergy_notes", e.target.value)}
          errorMessage={
            errors.allergy_notes && errors.allergy_notes._errors.join(", ")
          }
        />
      </div>
    </div>
  );
}

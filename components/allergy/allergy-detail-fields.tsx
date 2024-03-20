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
    <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
      <div className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
        <Input
          isReadOnly={!isEditing}
          className="mb-4"
          type="text"
          label="Name"
          labelPlacement="outside"
          value={allergy.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />

        <CustomAutocomplete
          isDisabled={!isEditing}
          label="Category"
          labelPlacement="outside"
          data={allergyCategories}
          inputValue={allergy.category}
          onInputChange={(value) => handleInputChange("category", value)}
        />
      </div>
      <div className="flex flex-col items-stretch w-[34%] ml-5 max-md:w-full max-md:ml-0">
        <CustomAutocomplete
          isDisabled={!isEditing}
          label="Status"
          labelPlacement="outside"
          data={allergyStatus}
          inputValue={allergy.clinical_status}
          onInputChange={(value) => handleInputChange("clinical_status", value)}
        />

        <Input
          isReadOnly={!isEditing}
          type="date"
          label="Recorded date"
          labelPlacement="outside"
          value={allergy.recorded_date}
          onChange={(e) => handleInputChange("recorded_date", e.target.value)}
        />
      </div>
      <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
        <CustomAutocomplete
          isDisabled={!isEditing}
          label="Type"
          labelPlacement="outside"
          data={allergyTypes}
          inputValue={allergy.type}
          onInputChange={(value) => handleInputChange("type", value)}
        />

        <Textarea
          isReadOnly={!isEditing}
          disableAnimation
          disableAutosize
          classNames={{ input: "resize-y min-h-[40px]" }}
          label="Note"
          labelPlacement="outside"
          value={allergy.allergy_notes}
          onChange={(e) => handleInputChange("allergy_notes", e.target.value)}
        />
      </div>
    </div>
  );
};

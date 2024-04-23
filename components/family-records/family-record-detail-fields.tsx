import { CustomAutocomplete } from "@/components/ui/auto-complete";
import { familyRecordStatus, genders } from "@/data/data";
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
    <>
      <div className="mb-4 font-bold text-2xl leading-[24px]">
        Family Record Information
      </div>
      <div className="mb-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-8">
        <Input
          isReadOnly={!isEditing}
          className="mb-4"
          type="text"
          label="Name"
          labelPlacement="outside"
          value={familyRecord.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />

        <Input
          isReadOnly={!isEditing}
          className="mb-4"
          type="text"
          label="Reason"
          labelPlacement="outside"
          value={familyRecord.reason}
          onChange={(e) => handleInputChange("reason", e.target.value)}
        />

        <CustomAutocomplete
          isDisabled={!isEditing}
          label="Status"
          labelPlacement="outside"
          data={familyRecordStatus}
          selectedKey={familyRecord.clinical_status}
          onSelectionChange={(value) =>
            handleInputChange("clinical_status", value)
          }
        />
        <Textarea
          isReadOnly={!isEditing}
          disableAnimation
          disableAutosize
          classNames={{ input: "resize-y min-h-[40px]" }}
          label="Note"
          labelPlacement="outside"
          value={familyRecord.notes}
          onChange={(e) => handleInputChange("notes", e.target.value)}
        />

        <Input
          isReadOnly={!isEditing}
          type="date"
          label="Recorded date"
          labelPlacement="outside"
          placeholder="MM-DD-YYYY"
          value={familyRecord.recorded_date}
          onChange={(e) => handleInputChange("recorded_date", e.target.value)}
        />
      </div>
      <div className="text-2xl font-bold leading-6 max-md:max-w-full">
        Relative Information
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-8">
        <Input
          isReadOnly={!isEditing}
          className="mb-4"
          type="text"
          label="Relative Name"
          labelPlacement="outside"
          value={familyRecord.relative_name}
          onChange={(e) => handleInputChange("relative_name", e.target.value)}
        />

        <CustomAutocomplete
          isDisabled={!isEditing}
          label="Gender"
          labelPlacement="outside"
          data={genders}
          inputValue={familyRecord.gender}
          onInputChange={(value) => handleInputChange("gender", value)}
        />
        <Input
          isReadOnly={!isEditing}
          type="date"
          label="Birthdate"
          labelPlacement="outside"
          placeholder="MM-DD-YYYY"
          value={familyRecord.birthdate}
          onChange={(e) => handleInputChange("birthdate", e.target.value)}
        />
      </div>
    </>
  );
};
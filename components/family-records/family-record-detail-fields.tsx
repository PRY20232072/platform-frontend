import { CustomAutocomplete } from "@/components/ui/auto-complete";
import { familyRecordStatus } from "@/data/data";
import { Input, Textarea } from "@nextui-org/react";

interface FamilyRecordDetailsProps {
  familyRecord: any;
  isEditing: boolean;
  handleInputChange: (key: string, value: any) => void;
  errors: any;
}

export default function FamilyRecordDetailFields({
  familyRecord,
  isEditing,
  handleInputChange,
  errors,
}: FamilyRecordDetailsProps) {
  return (
    <>
      <div className="mb-4 font-bold text-2xl leading-[24px]">
        Información del registro de historial familiar
      </div>
      <div className="mb-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-8">
        <Input
          isReadOnly={!isEditing}
          className="mb-4"
          type="text"
          label="Nombre"
          labelPlacement="outside"
          value={familyRecord.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          errorMessage={errors.name && errors.name._errors.join(", ")}
        />

        <Input
          isReadOnly={!isEditing}
          className="mb-4"
          type="text"
          label="Razón"
          labelPlacement="outside"
          value={familyRecord.reason}
          onChange={(e) => handleInputChange("reason", e.target.value)}
          errorMessage={errors.reason && errors.reason._errors.join(", ")}
        />

        <CustomAutocomplete
          isDisabled={!isEditing}
          label="Estado clínico"
          labelPlacement="outside"
          data={familyRecordStatus}
          selectedKey={familyRecord.clinical_status}
          onSelectionChange={(value) =>
            handleInputChange("clinical_status", value)
          }
          errorMessage={
            errors.clinical_status && errors.clinical_status._errors.join(", ")
          }
        />

        <Textarea
          isReadOnly={!isEditing}
          disableAnimation
          disableAutosize
          classNames={{ input: "resize-y min-h-[40px]" }}
          label="Nota"
          labelPlacement="outside"
          value={familyRecord.notes}
          onChange={(e) => handleInputChange("notes", e.target.value)}
          errorMessage={errors.notes && errors.notes._errors.join(", ")}
        />

        <Input
          isReadOnly={!isEditing}
          type="date"
          label="Fecha"
          labelPlacement="outside"
          placeholder="MM-DD-YYYY"
          value={familyRecord.recorded_date}
          onChange={(e) => handleInputChange("recorded_date", e.target.value)}
          errorMessage={
            errors.recorded_date && errors.recorded_date._errors.join(", ")
          }
        />
      </div>
    </>
  );
}

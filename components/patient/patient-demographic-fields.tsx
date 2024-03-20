import { CustomAutocomplete } from "@/components/ui/auto-complete";
import { Input } from "@nextui-org/react";
import { addressTypes, civilStatus, genders } from "@/data/data";

interface PatientDemographicFieldsProps {
  patient: any;
  isEditing: boolean;
  handleInputChange: (key: string, value: any) => void;
}

export const PatientDemographicFields = ({
  patient,
  isEditing,
  handleInputChange,
}: PatientDemographicFieldsProps) => {
  return (
    <>
      <div className="mb-4 font-bold text-2xl tracking-[0] leading-[24px]">
        General information
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="mb-4">
          <Input
            isReadOnly={!isEditing}
            type="text"
            label="Full name"
            labelPlacement="outside"
            placeholder="Complete full name"
            value={patient.name_id}
            onChange={(e) => handleInputChange("name_id", e.target.value)}
          />
        </div>
        <CustomAutocomplete
          isDisabled={!isEditing}
          label="Gender"
          labelPlacement="outside"
          placeholder="Select an option"
          data={genders}
          inputValue={patient.gender}
          onInputChange={(value) => handleInputChange("gender", value)}
        />

        <div className="mb-4">
          <Input
            isReadOnly={!isEditing}
            type="date"
            label="Birthdate"
            labelPlacement="outside"
            placeholder="Complete data"
            value={patient.birthDate}
            onChange={(e) => handleInputChange("birthDate", e.target.value)}
          />
        </div>
        <CustomAutocomplete
          isDisabled={!isEditing}
          label="Civil Status"
          labelPlacement="outside"
          placeholder="Select an option"
          data={civilStatus}
          inputValue={patient.maritalStatus}
          onInputChange={(value) => handleInputChange("maritalStatus", value)}
        />

        <div className=" flex-col items-start gap-[5px] relative !flex-1 !flex !grow">
          <Input
            isReadOnly={!isEditing}
            type="tel"
            label="Phone number"
            labelPlacement="outside"
            placeholder="Complete phone number"
            value={patient.telephone}
            onChange={(e) => handleInputChange("telephone", e.target.value)}
          />
        </div>
      </div>
      <div className="my-4 font-bold  text-2xl tracking-[0] leading-[24px]">
        Address
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
        <CustomAutocomplete
          isDisabled={!isEditing}
          label="Type of address"
          labelPlacement="outside"
          placeholder="Select an option"
          data={addressTypes}
          inputValue={patient.address.type_address}
          onInputChange={(value) =>
            handleInputChange("address.type_address", value)
          }
        />

        <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
          <Input
            isReadOnly={!isEditing}
            type="text"
            label="Address line"
            labelPlacement="outside"
            placeholder="Complete address line"
            value={patient.address.address_line}
            onChange={(e) =>
              handleInputChange("address.address_line", e.target.value)
            }
          />
        </div>
        <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
          <Input
            isReadOnly={!isEditing}
            type="text"
            label="District"
            labelPlacement="outside"
            placeholder="Complete district"
            value={patient.address.district}
            onChange={(e) =>
              handleInputChange("address.district", e.target.value)
            }
          />
        </div>
        <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
          <Input
            isReadOnly={!isEditing}
            type="text"
            label="City"
            labelPlacement="outside"
            placeholder="Complete city"
            value={patient.address.city}
            onChange={(e) => handleInputChange("address.city", e.target.value)}
          />
        </div>
        <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
          <Input
            isReadOnly={!isEditing}
            type="text"
            label="Country"
            labelPlacement="outside"
            placeholder="Complete country"
            value={patient.address.country}
            onChange={(e) =>
              handleInputChange("address.country", e.target.value)
            }
          />
        </div>
        <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
          <Input
            isReadOnly={!isEditing}
            type="text"
            label="Postal code"
            labelPlacement="outside"
            placeholder="Complete postal code"
            value={patient.address.postal_code}
            onChange={(e) =>
              handleInputChange("address.postal_code", e.target.value)
            }
          />
        </div>
      </div>
    </>
  );
};

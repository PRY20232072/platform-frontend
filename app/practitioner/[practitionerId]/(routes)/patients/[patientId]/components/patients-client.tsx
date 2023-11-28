import {
  Tabs,
  Tab,
  Input,
  Card,
  CardBody,
} from '@nextui-org/react';
import {
  civilStatus,
  genders,
  addressTypes,
} from '@/data/data';
import { CustomAutocomplete } from '@/components/ui/auto-complete';
import { PatientAllergiesTable } from './patient-allergies-table';
import { AllergyFormModal } from '../allergy-intolerance/[allergyIntoleranceId]/components/allergy-form-modal';

interface PatientsClientProps {
  patient: any;
}

export const PatientsClient: React.FC<PatientsClientProps> = ({ patient }) => {
  return (
    <>
      <Tabs
        aria-label="Options"
        classNames={{ tabList: 'bg-sky-100', tabContent: 'text-black' }}
      >
        <Tab key="demographic_info" title="Demographic Information">
          <Card>
            <CardBody className="items-stretch self-stretch shadow  flex flex-col mt-2.5 p-5 rounded-2xl max-md:max-w-full">
              <div className="mb-4 text-2xl font-bold leading-6 max-md:max-w-full">
                General information
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="mb-4">
                  <Input
                    isReadOnly
                    type="text"
                    label="Full name"
                    labelPlacement="outside"
                    placeholder="Complete full name"
                    value={patient.name_id}
                  />
                </div>
                <CustomAutocomplete
                  isDisabled={true}
                  label="Gender"
                  labelPlacement="outside"
                  placeholder="Select an option"
                  data={genders}
                  inputValue={patient.gender}
                />

                <div className="mb-4">
                  <Input
                    isReadOnly
                    type="date"
                    label="Birthdate"
                    labelPlacement="outside"
                    placeholder="Complete data"
                    value={patient.birthDate}
                  />
                </div>
                <CustomAutocomplete
                  isDisabled={true}
                  label="Civil Status"
                  labelPlacement="outside"
                  placeholder="Select and option"
                  data={civilStatus}
                  inputValue={patient.maritalStatus}
                />

                <div className=" flex-col items-start gap-[5px] relative !flex-1 !flex !grow">
                  <Input
                    isReadOnly
                    type="tel"
                    label="Phone number"
                    labelPlacement="outside"
                    placeholder="Complete phone number"
                    value={patient.telephone}
                  />
                </div>
              </div>
              <div className="  mb-4 font-bold  text-2xl tracking-[0] leading-[24px]">
                Address
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CustomAutocomplete
                  isDisabled={true}
                  label="Type of address"
                  labelPlacement="outside"
                  placeholder="Select an option"
                  data={addressTypes}
                  inputValue={patient.address.type_address}
                />

                <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
                  <Input
                    isReadOnly
                    type="text"
                    label="Address line"
                    labelPlacement="outside"
                    placeholder="Complete address line"
                    value={patient.address.address_line}
                  />
                </div>
                <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
                  <Input
                    isReadOnly
                    type="text"
                    label="District"
                    labelPlacement="outside"
                    placeholder="Complete district"
                    value={patient.address.district}
                  />
                </div>
                <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
                  <Input
                    isReadOnly
                    type="text"
                    label="City"
                    labelPlacement="outside"
                    placeholder="Complemete city"
                    value={patient.address.city}
                  />
                </div>
                <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
                  <Input
                    isReadOnly
                    type="text"
                    label="Country"
                    labelPlacement="outside"
                    placeholder="Complete country"
                    value={patient.address.country}
                  />
                </div>
                <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
                  <Input
                    isReadOnly
                    type="text"
                    label="Postal code"
                    labelPlacement="outside"
                    placeholder="Complete postal code"
                    value={patient.address.postal_code}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="allergies" title="Allergies">
          <Card className="self-stretch flex flex-col  p-5 rounded-2xl max-md:max-w-full">
            <CardBody>
              <AllergyFormModal />
              <PatientAllergiesTable />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </>
  );
};

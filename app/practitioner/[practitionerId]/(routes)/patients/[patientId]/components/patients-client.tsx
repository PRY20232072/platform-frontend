'use client';
import {
  Tabs,
  Tab,
  Input,
  Card,
  CardBody,
  Textarea,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import { Plus } from 'lucide-react';

import {
  allergyStatus,
  allergyDocTableColumns,
  allergyAccessTableColumns,
  patientAllergiesAccess,
  patientAllergiesDocs,
  allergyCategories,
  allergyTypes,
  practitioners,
  civilStatus,
  genders,
  addressTypes,
  selectedPatientAllergiesTableColumns,
  selectedPatientAllergies,
} from '@/data/data';
import { CustomAutocomplete } from '@/components/ui/auto-complete';
import { PatientAllergiesTable } from './patient-allergies-table';
import { AllergyFormModal } from '../allergy-intolerance/[allergyIntoleranceId]/components/allergy-form-modal';

export const PatientsClient = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                    placeholder="Jhon Doe"
                  />
                </div>
                <CustomAutocomplete
                  isDisabled={true}
                  label="Gender"
                  labelPlacement="outside"
                  placeholder="Male"
                  data={genders}
                />

                <div className="mb-4">
                  <Input
                    isReadOnly
                    type="date"
                    label="Birthdate"
                    labelPlacement="outside"
                    placeholder="01/01/1999"
                  />
                </div>
                <CustomAutocomplete
                  isDisabled={true}
                  label="Civil Status"
                  labelPlacement="outside"
                  placeholder="Single"
                  data={civilStatus}
                />

                <div className=" flex-col items-start gap-[5px] relative !flex-1 !flex !grow">
                  <Input
                    isReadOnly
                    type="tel"
                    label="Phone number"
                    labelPlacement="outside"
                    placeholder="987654321"
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
                  placeholder="Physical"
                  data={addressTypes}
                />

                <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
                  <Input
                    isReadOnly
                    type="text"
                    label="Address line"
                    labelPlacement="outside"
                    placeholder="Av. Brazil"
                  />
                </div>
                <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
                  <Input
                    isReadOnly
                    type="text"
                    label="District"
                    labelPlacement="outside"
                    placeholder="Lima"
                  />
                </div>
                <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
                  <Input
                    isReadOnly
                    type="text"
                    label="City"
                    labelPlacement="outside"
                    placeholder="Lima"
                  />
                </div>
                <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
                  <Input
                    isReadOnly
                    type="text"
                    label="Country"
                    labelPlacement="outside"
                    placeholder="Peru"
                  />
                </div>
                <div className="inline-flex flex-col items-start gap-[5px] relative !flex-[0_0_auto]">
                  <Input
                    isReadOnly
                    type="text"
                    label="Postal code"
                    labelPlacement="outside"
                    placeholder="20010"
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="allergies" title="Allergies">
          <Card className="self-stretch flex flex-col  p-5 rounded-2xl max-md:max-w-full">
            <CardBody>
              <div className="items-stretch justify-end gap-4 inline-flex mb-3">
                <Button
                  onPress={onOpen}
                  className="text-white bg-blue-600 px-4 rounded-xl justify-center items-center gap-3 flex"
                >
                  Add New <Plus className="h-4 w-4" />
                </Button>
                <Modal
                  backdrop="blur"
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                  className="w-[700px] max-w-full"
                >
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          Request Access
                        </ModalHeader>
                        <ModalBody>
                          <div>
                            Do you want to request access to allergy record documents?
                          </div>
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            color="danger"
                            variant="flat"
                            onPress={onClose}
                          >
                            Cancel
                          </Button>
                          <Button color="primary" onPress={onClose}>
                            Accept
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </div>
              <PatientAllergiesTable
                items={selectedPatientAllergies}
                columns={selectedPatientAllergiesTableColumns}
              />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </>
  );
};

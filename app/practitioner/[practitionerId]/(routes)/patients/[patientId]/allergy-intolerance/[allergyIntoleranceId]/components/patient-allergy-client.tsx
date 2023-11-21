'use client';
import React from 'react';
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Input,
  Textarea,
  Button,
} from '@nextui-org/react';
import { CustomAutocomplete } from '@/components/ui/auto-complete';
import {
  allergyStatus,
  allergyCategories,
  allergyTypes,
  selectedPatientAllergiesDocs,
  selectedPatientAllergiesDocsTableColumns,
} from '@/data/data';
import { PatientAllergyDocsClient } from './patient-allergy-docs';
import { AllergyFormModal } from '../components/allergy-form-modal';

export const PatientAllergyClient = () => {
  return (
    <>
      <Tabs
        aria-label="Options"
        classNames={{ tabList: 'bg-sky-100', tabContent: 'text-black' }}
      >
        <Tab key="details" title="Details">
          <Card>
            <CardBody className="items-stretch self-stretch shadow  flex flex-col mt-2.5 p-5 rounded-2xl max-md:max-w-full">
              <div className="text-2xl font-bold leading-6 max-md:max-w-full">
                Allergy Record Information
              </div>
              <form className="mt-8 max-md:max-w-full">
                <div className="  gap-5 flex max-md:flex-col max-md:items-stretch ">
                  <div className="  flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
                    <Input
                      className="mb-4"
                      type="text"
                      label="Name"
                      labelPlacement="outside"
                      placeholder="Allergic reaction"
                    />

                    <CustomAutocomplete
                      isDisabled={true}
                      label="Category"
                      labelPlacement="outside"
                      placeholder="Food"
                      data={allergyCategories}
                    />
                  </div>
                  <div className="  flex flex-col items-stretch w-[34%] ml-5 max-md:w-full max-md:ml-0">
                    <CustomAutocomplete
                      isDisabled={true}
                      label="Status"
                      labelPlacement="outside"
                      placeholder="Active"
                      data={allergyStatus}
                    />

                    <Input
                      type="date"
                      label="Recorded date"
                      labelPlacement="outside"
                      placeholder="09/23/2023"
                    />
                  </div>
                  <div className=" flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                    <CustomAutocomplete
                      isDisabled={true}
                      label="Type"
                      labelPlacement="outside"
                      placeholder="Dairy"
                      data={allergyTypes}
                    />

                    <Textarea
                      disableAnimation
                      disableAutosize
                      classNames={{ input: 'resize-y min-h-[40px]' }}
                      label="Note"
                      labelPlacement="outside"
                      placeholder="Skin rash"
                    />
                  </div>
                </div>
              </form>
              <Button className="text-white  font-medium leading-6 whitespace-nowrap justify-center items-center bg-blue-600 self-center w-[77px] max-w-full mt-2 px-4 py-3 rounded-xl">
                Edit
              </Button>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="documents" title="Documents">
          <Card className="self-stretch flex flex-col  p-5 rounded-2xl max-md:max-w-full">
            <CardBody>
              <AllergyFormModal />
              <PatientAllergyDocsClient
                items={selectedPatientAllergiesDocs}
                columns={selectedPatientAllergiesDocsTableColumns}
              />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </>
  );
};

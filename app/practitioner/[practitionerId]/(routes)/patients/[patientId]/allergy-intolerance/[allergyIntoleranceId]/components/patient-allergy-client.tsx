'use client';
import React, { useDebugValue, useEffect, useState } from 'react';
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
import { useParams } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import allergyIntoleranceService from '@/services/allergyIntoleranceService';

export const PatientAllergyClient = () => {
  const [allergy, setAllergy] = useState<any>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { response: allergyResponse, fetchData: getAllergy } = useApi();
  const { response: updateAllergyResponse, fetchData: updateAllergy } = useApi();
  const params = useParams();

  useEffect(() => {
    getAllergy(allergyIntoleranceService.getAllergyById(params.allergyIntoleranceId));
  }, [params.allergyIntoleranceId]);

  useEffect(() => {
    if (allergyResponse.isSuccess) {
      setAllergy(allergyResponse.data[0]);
    }
  }, [allergyResponse.isSuccess]);

  useEffect(() => {
    if (updateAllergyResponse.isSuccess) {
      getAllergy(allergyIntoleranceService.getAllergyById(params.allergyIntoleranceId));
    }
  }, [updateAllergyResponse.isSuccess]);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateAllergy(allergyIntoleranceService.updateAllergy(allergy.allergy_id, allergy, params.practitionerId));
    setIsEditing(!isEditing);
  };

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
              <form className="mt-8 max-md:max-w-full" onSubmit={handleEdit}>
                <div className="  gap-5 flex max-md:flex-col max-md:items-stretch ">
                  <div className="  flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
                    <Input
                      isReadOnly={!isEditing}
                      className="mb-4"
                      type="text"
                      label="Name"
                      labelPlacement="outside"
                      value={allergy.name}
                      onChange={(e) => {
                        setAllergy({ ...allergy, name: e.target.value })
                      }}
                    />

                    <CustomAutocomplete
                      isDisabled={!isEditing}
                      label="Category"
                      labelPlacement="outside"
                      data={allergyCategories}
                      inputValue={allergy.category}
                      onInputChange={(value) => {
                        setAllergy({ ...allergy, category: value })
                      }}
                    />
                  </div>
                  <div className="  flex flex-col items-stretch w-[34%] ml-5 max-md:w-full max-md:ml-0">
                    <CustomAutocomplete
                      isDisabled={!isEditing}
                      label="Status"
                      labelPlacement="outside"
                      data={allergyStatus}
                      inputValue={allergy.clinical_status}
                      onInputChange={(value) => {
                        setAllergy({ ...allergy, clinical_status: value })
                      }}
                    />

                    <Input
                      isReadOnly={!isEditing}
                      type="date"
                      label="Recorded date"
                      labelPlacement="outside"
                      value={allergy.recorded_date}
                      onChange={(e) => {
                        setAllergy({ ...allergy, recorded_date: e.target.value })
                      }}
                    />
                  </div>
                  <div className=" flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                    <CustomAutocomplete
                      isDisabled={!isEditing}
                      label="Type"
                      labelPlacement="outside"
                      data={allergyTypes}
                      inputValue={allergy.type}
                      onInputChange={(value) => {
                        setAllergy({ ...allergy, type: value })
                      }}
                    />

                    <Textarea
                      isReadOnly={!isEditing}
                      disableAnimation
                      disableAutosize
                      classNames={{ input: 'resize-y min-h-[40px]' }}
                      label="Note"
                      labelPlacement="outside"
                      value={allergy.allergy_notes}
                      onChange={(e) => {
                        setAllergy({ ...allergy, allergy_notes: e.target.value })
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  {(isEditing ? (
                    <>
                      <Button
                        className="text-red-600 font-medium leading-6 whitespace-nowrap justify-center items-center bg-red-300 self-center w-[77px] max-w-full mt-2 px-4 py-3 rounded-xl"
                        onClick={() => {
                          setIsEditing(!isEditing);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="text-white font-medium leading-6 whitespace-nowrap justify-center items-center bg-amber-500 self-center w-[77px] max-w-full mt-2 ml-4 px-4 py-3 rounded-xl"
                        type='submit'
                      >
                        Save
                      </Button>
                    </>
                  ) : (
                    <Button
                      className="text-white font-medium leading-6 whitespace-nowrap justify-center items-center bg-blue-600 self-center w-[77px] max-w-full mt-2 px-4 py-3 rounded-xl"
                      onClick={() => {
                        setIsEditing(!isEditing);
                      }}
                    >
                      Edit
                    </Button>
                  ))}
                </div>
              </form>
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

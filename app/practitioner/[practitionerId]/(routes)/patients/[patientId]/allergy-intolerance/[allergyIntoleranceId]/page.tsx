import React from 'react';
import { Tabs, Tab, Card, CardBody, Input, Textarea } from '@nextui-org/react';
import { CustomAutocomplete } from '@/components/ui/auto-complete';
import {
  allergyStatus,
  allergyDocTableColumns,
  allergyAccessTableColumns,
  patientAllergiesAccess,
  patientAllergiesDocs,
  allergyCategories,
  allergyTypes,
  practitioners,
  practitionersTableColumns,
} from '@/data/data';
import { PatientAllergyClient } from './components/patient-allergy-client';

const SelectedAllergyPatientDetails = () => {
  return (
    <div className="flex flex-col gap-5 px-4 py-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-32 items-stretch">
      <div className="justify-between items-center border-b border-gray-200 flex w-full max-w-[1100px] gap-5 mt-1 max-md:max-w-full max-md:flex-wrap">
        <div className="flex grow basis-[0%] flex-col items-stretch my-auto max-md:max-w-full">
          <div className="text-4xl font-bold leading-10 max-md:max-w-full">
            Detail Allergy Record
          </div>
          <div className="justify-center text-neutral-400 text-2xl leading-10 max-md:max-w-full">
            Jhon Doe | jhondoe@plataform.com
          </div>
          <div className="justify-center text-neutral-400 text-base leading-10 max-md:max-w-full">
            ID: 81823182
          </div>
        </div>
      </div>
       <PatientAllergyClient /> 
    </div>
  );
};
export default SelectedAllergyPatientDetails;

"use client";

import React from 'react';
import { AllergyTable } from './components/allergy-table';
import AllergyPatientBasicInfo from './components/allergy-patient-basic-info';

export default function AllergiesPage() {
  return (
    <div className="flex flex-col items-center gap-5 px-4 py-4 md:px-8 lg:px-16 xl:px-20 2xl:px-32">
      <AllergyPatientBasicInfo />
      <div className="w-full max-w-4xl mx-auto">
        <AllergyTable />
      </div>
    </div>
  );
}

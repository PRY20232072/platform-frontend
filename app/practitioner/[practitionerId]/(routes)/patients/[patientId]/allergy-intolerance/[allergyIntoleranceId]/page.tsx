"use client";

import React from "react";
import { PatientAllergyClient } from "./components/patient-allergy-client";
import PatientBasicInfo from "./components/patient-basic-info";

const SelectedAllergyPatientDetails = () => {
  return (
    <div className="flex flex-col gap-5 px-4 py-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-32 items-stretch">
      <PatientBasicInfo />
      <PatientAllergyClient />
    </div>
  );
};
export default SelectedAllergyPatientDetails;

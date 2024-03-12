"use client";

import PatientBasicInfo from "./components/patient-basic-info";
import PatientsClient from "./components/patients-client";

export default function PatientPage() {
  return (
    <div className="flex flex-col gap-5 px-4 py-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-32 items-stretch">
      <PatientBasicInfo />
      <PatientsClient />
    </div>
  );
}

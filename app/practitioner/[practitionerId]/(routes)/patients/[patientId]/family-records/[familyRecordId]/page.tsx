"use client";

import React from "react";
import { FamilyRecordClient } from "./components/family-record-client";
import PatientBasicInfo from "./components/patient-basic-info";
import ReturnButton from "@/components/ui/return-button";

const SelectedFamilyRecordDetails = () => {
  return (
    <div className="flex flex-col gap-5 px-4 py-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-32 items-stretch relative">
      <ReturnButton />
      <PatientBasicInfo />
      <FamilyRecordClient />
    </div>
  );
};
export default SelectedFamilyRecordDetails;

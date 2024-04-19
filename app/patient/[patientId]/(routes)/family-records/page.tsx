import React from "react";
import { FamilyRecordsTable } from "./components/family-records-table";
import FamilyRecordsBasicInfo from "./components/family-records-basic-info";

export default function FamilyRecordPage() {
  return (
    <div className='flex flex-col items-center gap-5 px-4 py-4 md:px-8 lg:px-16 xl:px-20 2xl:px-32'>
      <FamilyRecordsBasicInfo />
      <div className='w-full max-w-4xl mx-auto'>
        <FamilyRecordsTable />
      </div>
    </div>
  );
}

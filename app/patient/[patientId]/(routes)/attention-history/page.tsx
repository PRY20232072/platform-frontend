"use client";

import AttentionPatientBasicInfo from "./components/attention-patient-basic-info";
import AttentionTable from "./components/attention-table";

const AttentionPage = () => {
  return (
    <div className="flex flex-col items-center gap-5 px-4 py-4 md:px-8 lg:px-16 xl:px-20 2xl:px-32">
      <AttentionPatientBasicInfo />
      <div className="w-full max-w-4xl mx-auto">
        <AttentionTable />
      </div>
    </div>
  );
};

export default AttentionPage;
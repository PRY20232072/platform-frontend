"use client";

import React, { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import FamilyRecordDocs from "./family-record-docs";
import PatientFamilyRecordDetail from "./patient-family-record-detail";

export const FamilyRecordClient = () => {
  const [family_record, setFamilyRecord] = useState<any>({});

  return (
    <>
      <Tabs
        aria-label="Options"
        classNames={{ tabList: "bg-sky-100", tabContent: "text-black" }}
      >
        <Tab key="details" title="Details">
          <PatientFamilyRecordDetail
            family_record={family_record}
            setFamilyRecord={setFamilyRecord}
          />
        </Tab>
        <Tab key="documents" title="Documents">
          <FamilyRecordDocs
            family_record={family_record}
            setFamilyRecord={setFamilyRecord}
          />
        </Tab>
      </Tabs>
    </>
  );
};

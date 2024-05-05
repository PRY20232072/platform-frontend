"use client";

import React, { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import FamilyRecordDetail from "./family-record-detail";
import DocumentsTable from "@/components/documents/documents-table";
import FamilyRecordAccess from "./family-record-access";

export const FamilyRecordClient = () => {
  const [familyRecord, setFamilyRecord] = useState<any>({});

  return (
    <>
      <Tabs
        aria-label="Options"
        classNames={{ tabList: "bg-sky-100", tabContent: "text-black" }}
      >
        <Tab key="details" title="Detalles">
          <FamilyRecordDetail
            familyRecord={familyRecord}
            setFamilyRecord={setFamilyRecord}
          />
        </Tab>
        <Tab key="documents" title="Documentos">
          <DocumentsTable items={familyRecord?.files || []} />
        </Tab>
        <Tab key="access" title="Accesos">
          <FamilyRecordAccess />
        </Tab>
      </Tabs>
    </>
  );
};

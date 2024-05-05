"use client";

import React, { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import AllergyDetail from "./allergy-detail";
import DocumentsTable from "@/components/documents/documents-table";
import AllergyAccess from "./allergy-access";

export const AllergyClient = () => {
  const [allergy, setAllergy] = useState<any>({});

  return (
    <>
      <Tabs
        aria-label="Options"
        classNames={{ tabList: "bg-sky-100", tabContent: "text-black" }}
      >
        <Tab key="details" title="Detalles">
          <AllergyDetail allergy={allergy} setAllergy={setAllergy} />
        </Tab>
        <Tab key="documents" title="Documentos">
          <DocumentsTable items={allergy?.files || []} />
        </Tab>
        <Tab key="access" title="Accesos">
          <AllergyAccess />
        </Tab>
      </Tabs>
    </>
  );
};

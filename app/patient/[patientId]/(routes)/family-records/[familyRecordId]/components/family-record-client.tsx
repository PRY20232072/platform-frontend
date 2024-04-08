"use client";

import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { FamilyRecordAccessClient } from "./family-record-access-client";
import { PractitionersSearch } from "./practitioners-search-modal";
import FamilyRecordDetail from "./family-record-detail";
import DocumentsTable from "@/components/documents/documents-table";

export const FamilyRecordClient = () => {
  const [familyRecord, setFamilyRecord] = useState<any>({});

  return (
    <>
      <Tabs
        aria-label="Options"
        classNames={{ tabList: "bg-sky-100", tabContent: "text-black" }}
      >
        <Tab key="details" title="Details">
          <FamilyRecordDetail
            familyRecord={familyRecord}
            setFamilyRecord={setFamilyRecord}
          />
        </Tab>
        <Tab key="documents" title="Documents">
          <DocumentsTable items={familyRecord?.files || []} />
        </Tab>
        <Tab key="access" title="Access">
          <Card className="self-stretch flex flex-col  p-5 rounded-2xl max-md:max-w-full">
            <CardBody>
              <PractitionersSearch />
              <FamilyRecordAccessClient />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </>
  );
};

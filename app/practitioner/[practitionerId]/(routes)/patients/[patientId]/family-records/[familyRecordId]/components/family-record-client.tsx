"use client";

import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import {
  selectedPatientFamilyRecordDocs,
  selectedPatientFamilyRecordDocsTableColumns,
} from "@/data/data";
import { FamilyRecordDocs } from "./family-record-docs";
import { FamilyRecordDocFormModal } from "@/components/modal/family-record-doc-form";
import PatientFamilyRecordDetail from "./patient-family-record-detail";

export const FamilyRecordClient = () => {
  return (
    <>
      <Tabs
        aria-label="Options"
        classNames={{ tabList: "bg-sky-100", tabContent: "text-black" }}
      >
        <Tab key="details" title="Details">
          <PatientFamilyRecordDetail />
        </Tab>
        <Tab key="documents" title="Documents">
          <Card className="self-stretch flex flex-col  p-5 rounded-2xl max-md:max-w-full">
            <CardBody>
              <FamilyRecordDocFormModal />

              <FamilyRecordDocs
                items={selectedPatientFamilyRecordDocs}
                columns={selectedPatientFamilyRecordDocsTableColumns}
              />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </>
  );
};

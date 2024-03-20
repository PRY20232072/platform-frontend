"use client";

import React from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
} from "@nextui-org/react";
import {
  selectedPatientAllergiesDocs,
  selectedPatientAllergiesDocsTableColumns,
} from "@/data/data";
import { PatientAllergyDocsClient } from "./patient-allergy-docs";
import { AllergyFormModal } from "../components/allergy-form-modal";
import PatientAllergyDetail from "./patient-allergy-detail";

export const PatientAllergyClient = () => {
  return (
    <>
      <Tabs
        aria-label="Options"
        classNames={{ tabList: "bg-sky-100", tabContent: "text-black" }}
      >
        <Tab key="details" title="Details">
          <PatientAllergyDetail />
        </Tab>
        <Tab key="documents" title="Documents">
          <Card className="self-stretch flex flex-col  p-5 rounded-2xl max-md:max-w-full">
            <CardBody>
              <AllergyFormModal />
              <PatientAllergyDocsClient
                items={selectedPatientAllergiesDocs}
                columns={selectedPatientAllergiesDocsTableColumns}
              />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </>
  );
};

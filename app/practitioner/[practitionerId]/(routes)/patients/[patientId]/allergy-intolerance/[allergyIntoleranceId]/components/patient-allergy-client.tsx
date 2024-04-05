"use client";

import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import PatientAllergyDetail from "./patient-allergy-detail";
import PatientAllergyDocs from "./patient-allergy-docs";

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
          <PatientAllergyDocs />
        </Tab>
      </Tabs>
    </>
  );
};

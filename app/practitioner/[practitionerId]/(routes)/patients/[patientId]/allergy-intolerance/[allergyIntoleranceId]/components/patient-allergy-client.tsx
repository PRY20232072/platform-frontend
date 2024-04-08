"use client";

import React, { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import PatientAllergyDetail from "./patient-allergy-detail";
import PatientAllergyDocs from "./patient-allergy-docs";

export const PatientAllergyClient = () => {
  const [allergy, setAllergy] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Tabs
        aria-label="Options"
        classNames={{ tabList: "bg-sky-100", tabContent: "text-black" }}
      >
        <Tab key="details" title="Details">
          <PatientAllergyDetail
            allergy={allergy}
            setAllergy={setAllergy}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </Tab>
        <Tab key="documents" title="Documents">
          <PatientAllergyDocs allergy={allergy} setAllergy={setAllergy} />
        </Tab>
      </Tabs>
    </>
  );
};

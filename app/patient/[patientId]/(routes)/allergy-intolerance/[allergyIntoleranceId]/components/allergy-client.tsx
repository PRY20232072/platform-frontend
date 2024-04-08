"use client";

import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { AllergyAccessClient } from "./allergy-access-client";
import { PractitionersSearch } from "./practitioners-search-modal";
import AllergyDetail from "./allergy-detail";
import DocumentsTable from "@/components/documents/documents-table";

export const AllergyClient = () => {
  const [allergy, setAllergy] = useState<any>({});

  return (
    <>
      <Tabs
        aria-label="Options"
        classNames={{ tabList: "bg-sky-100", tabContent: "text-black" }}
      >
        <Tab key="details" title="Details">
          <AllergyDetail allergy={allergy} setAllergy={setAllergy} />
        </Tab>
        <Tab key="documents" title="Documents">
          <DocumentsTable items={allergy?.files || []} />
        </Tab>
        <Tab key="access" title="Access">
          <Card className="self-stretch flex flex-col  p-5 rounded-2xl max-md:max-w-full">
            <CardBody>
              <PractitionersSearch />
              <AllergyAccessClient />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </>
  );
};

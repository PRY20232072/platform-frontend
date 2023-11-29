"use client";

import React from 'react';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import {
  allergyDocTableColumns,
  patientAllergiesDocs,
} from '@/data/data';
import { AllergyAccessClient } from './allergy-access-client';
import { AllergyDocsClient } from './allergy-docs-client';
import { PractitionersSearch } from './practitioners-search-modal';
import AllergyDetail from './allergy-detail';

export const AllergyClient = () => {
  return (
    <>
      <Tabs
        aria-label="Options"
        classNames={{ tabList: 'bg-sky-100', tabContent: 'text-black' }}
      >
        <Tab key="details" title="Details">
          <AllergyDetail />
        </Tab>
        <Tab key="documents" title="Documents">
          <AllergyDocsClient
            items={patientAllergiesDocs}
            columns={allergyDocTableColumns}
          />
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

"use client";

import React from 'react';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import {
  patientFamilyRecordDocTableColumns,
  patientFamilyRecordDocs,
} from '@/data/data';
import { FamilyRecordAccessClient } from './family-record-access-client';
import { FamilyRecordDocsClient } from './family-record-docs-client';
import { PractitionersSearch } from './practitioners-search-modal';
import FamilyRecordDetail from './family-record-detail';

export const FamilyRecordClient = () => {
  return (
    <>
      <Tabs
        aria-label="Options"
        classNames={{ tabList: 'bg-sky-100', tabContent: 'text-black' }}
      >
        <Tab key="details" title="Details">
          <FamilyRecordDetail />
        </Tab>
        <Tab key="documents" title="Documents">
          <FamilyRecordDocsClient
            items={patientFamilyRecordDocs}
            columns={patientFamilyRecordDocTableColumns}
          />
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

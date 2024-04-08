import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import AddDocModal from "@/components/documents/add-doc-modal";
import DocumentsTable from "@/components/documents/documents-table";

type FamilyRecordDocsProps = {
  family_record: any;
  setFamilyRecord: any;
};

const FamilyRecordDocs = ({
  family_record,
  setFamilyRecord,
}: FamilyRecordDocsProps) => {
  return (
    <Card className="self-stretch flex flex-col  p-5 rounded-2xl max-md:max-w-full">
      <CardBody>
        <AddDocModal registerType="FAMILY_HISTORY" />
        <DocumentsTable items={family_record?.files || []} />
      </CardBody>
    </Card>
  );
};

export default FamilyRecordDocs;

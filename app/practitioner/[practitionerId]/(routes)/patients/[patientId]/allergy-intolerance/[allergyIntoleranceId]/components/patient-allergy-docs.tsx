"use client";

import { Card, CardBody } from "@nextui-org/card";
import AddDocModal from "@/components/documents/add-doc-modal";
import DocumentsTable from "@/components/documents/documents-table";

type PatientAllergyDocsProps = {
  allergy: any;
  setAllergy: any;
};

const PatientAllergyDocs = ({
  allergy,
  setAllergy,
}: PatientAllergyDocsProps) => {
  return (
    <Card className="self-stretch flex flex-col  p-5 rounded-2xl max-md:max-w-full">
      <CardBody>
        <AddDocModal registerType="ALLERGY" />
        <DocumentsTable items={allergy?.files || []} />
      </CardBody>
    </Card>
  );
};

export default PatientAllergyDocs;

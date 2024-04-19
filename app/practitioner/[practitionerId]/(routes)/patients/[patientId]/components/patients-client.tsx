import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { PatientAllergiesTable } from "./patient-allergies-table";
import { AllergyFormModal } from "../allergy-intolerance/[allergyIntoleranceId]/components/allergy-form-modal";
import { FamilyRecordFormModal } from "@/components/modal/family-record-form";
import { PatientFamilyRecordsTable } from "./patient-family-records-table";
import PatientDemographicInformation from "./patient-demographic-information";

export default function PatientsClient() {
  return (
    <>
      <Tabs
        aria-label="Options"
        classNames={{ tabList: "bg-sky-100", tabContent: "text-black" }}
      >
        <Tab key="demographic_info" title="Información demográfica">
          <PatientDemographicInformation />
        </Tab>
        <Tab key="familyRecords" title="Historial Familiar">
          <Card className="self-stretch flex flex-col  p-5 rounded-2xl max-md:max-w-full">
            <CardBody>
              <FamilyRecordFormModal />
              <PatientFamilyRecordsTable />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="allergies" title="Alergias">
          <Card className="self-stretch flex flex-col  p-5 rounded-2xl max-md:max-w-full">
            <CardBody>
              <AllergyFormModal />
              <PatientAllergiesTable />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </>
  );
}

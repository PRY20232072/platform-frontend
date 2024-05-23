import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { PatientAllergiesTable } from "./patient-allergies-table";
import { AllergyFormModal } from "../allergy-intolerance/[allergyIntoleranceId]/components/allergy-form-modal";
import { FamilyRecordFormModal } from "@/components/modal/family-record-form";
import { PatientFamilyRecordsTable } from "./patient-family-records-table";
import PatientDemographicInformation from "./patient-demographic-information";
import PatientDocuments from "./patient-documents";
import PatientAttentionHistoryTable from "./patient-attention-history-table";
import { EncounterFormModal } from "@/components/modal/encounter-form";
import { useParams} from "next/navigation";
import { Key, useState } from "react";
import Link from "next/link";

export default function PatientsClient() {
  const params = useParams();
  const [selected, setSelected] = useState("demographic-info");

  return (
    <>
      <Tabs
        aria-label='Options'
        classNames={{ tabList: "bg-sky-100", tabContent: "text-black" } }
        selectedKey={selected}
        onSelectionChange={(value: Key) => setSelected(value.toString())}  
       >
        <Tab key='demographic-info' title='Información demográfica'>
          <PatientDemographicInformation />
        </Tab>
        <Tab as={Link} key='encounters' title='Historial de atenciones' href={`${params.patientId}/encounters`}>
          <Card className='self-stretch flex flex-col  p-5 rounded-2xl max-md:max-w-full'>
            <CardBody>
              <EncounterFormModal />
              <PatientAttentionHistoryTable />
            </CardBody>
          </Card>
        </Tab>
        <Tab key='familyrecords' title='Antecedente Familiar' href={`${params.patientId}/familyrecords`}>
          <Card className='self-stretch flex flex-col  p-5 rounded-2xl max-md:max-w-full'>
            <CardBody>
              <FamilyRecordFormModal />
              <PatientFamilyRecordsTable />
            </CardBody>
          </Card>
        </Tab> 
        <Tab key='allergies' title='Alergias' href={`${params.patientId}/allergies`}>
          <Card className='self-stretch flex flex-col  p-5 rounded-2xl max-md:max-w-full'>
            <CardBody>
              <AllergyFormModal />
              <PatientAllergiesTable />
            </CardBody>
          </Card>
        </Tab>
        <Tab key='documents' title='Documentos' href={`${params.patientId}/documents`}>
          <PatientDocuments />
        </Tab>
      </Tabs>
    </>
  );
}

"use client";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import PatientAttentionHistoryTable from "../components/patient-attention-history-table";
import { EncounterFormModal } from "@/components/modal/encounter-form";
import { useParams } from "next/navigation";
import  { Key,useState } from "react";
import PatientBasicInfo from "../components/patient-basic-info";
import Link from "next/link";

export default function Encounters() {
  const params = useParams();
  const [selected, setSelected] = useState("encounters");

  return (
    <div className='flex flex-col gap-5 px-4 py-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-32 items-stretch'>
      <PatientBasicInfo />
      <Tabs
        aria-label='Options'
        classNames={{ tabList: "bg-sky-100", tabContent: "text-black" }}
        selectedKey={selected}
        onSelectionChange={(value: Key) => setSelected(value.toString())}
      >
        <Tab
          as={Link}
          key='demographic-info'
          title='Información demográfica'
          href={`/practitioner/${params.practitionerId}/patients/${params.patientId}`}
        ></Tab>
        <Tab key='encounters' title='Historial de atenciones'>
          <Card className='self-stretch flex flex-col  p-5 rounded-2xl max-md:max-w-full'>
            <CardBody>
              <EncounterFormModal />
              <PatientAttentionHistoryTable />
            </CardBody>
          </Card>
        </Tab>
        <Tab
          as={Link}
          key='familyrecords'
          title='Antecedente Familiar'
          href={`/practitioner/${params.practitionerId}/patients/${params.patientId}/familyrecords`}
        ></Tab>
        <Tab
          as={Link}
          key='allergies'
          title='Alergias'
          href={`/practitioner/${params.practitionerId}/patients/${params.patientId}/allergies`}
        ></Tab>
        <Tab
          as={Link}
          key='documents'
          title='Documentos'
          href={`/practitioner/${params.practitionerId}/patients/${params.patientId}/documents`}
        ></Tab>
      </Tabs>
    </div>
  );
}

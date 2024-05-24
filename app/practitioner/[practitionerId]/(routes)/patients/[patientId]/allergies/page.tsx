"use client";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { Key, useState } from "react";
import PatientBasicInfo from "../components/patient-basic-info";
import { PatientAllergiesTable } from "../components/patient-allergies-table";
import { AllergyFormModal } from "../allergy-intolerance/[allergyIntoleranceId]/components/allergy-form-modal";
import Link from "next/link";

export default function Allergies() {
  const params = useParams();
  const [selected, setSelected] = useState("allergies");

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
        <Tab key='encounters' title='Historial de atenciones'></Tab>
        <Tab
          as={Link}
          key='familyrecords'
          title='Antecedentes Familiares'
          href={`/practitioner/${params.practitionerId}/patients/${params.patientId}/familyrecords`}
        ></Tab>
        <Tab key='allergies' title='Alergias'>
          <Card className='self-stretch flex flex-col  p-5 rounded-2xl max-md:max-w-full'>
            <CardBody>
              <AllergyFormModal />
              <PatientAllergiesTable />
            </CardBody>
          </Card>
        </Tab>
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

"use client";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { Key, useState } from "react";
import PatientBasicInfo from "../components/patient-basic-info";
import PatientDocuments from "../components/patient-documents";

export default function Documents() {
  const params = useParams();
  const [selected, setSelected] = useState("documents");

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
          key='demographic-info'
          title='Información demográfica'
          href={`/practitioner/${params.practitionerId}/patients/${params.patientId}`}
        ></Tab>
        <Tab key='encounters' title='Historial de atenciones' href={`/practitioner/${params.practitionerId}/patients/${params.patientId}/encounters`}></Tab>
        <Tab
          key='family-records'
          title='Antecedente Familiar'
          href={`/practitioner/${params.practitionerId}/patients/${params.patientId}/familyrecords`}
        ></Tab>
        <Tab key='allergies' title='Alergias' href={`/practitioner/${params.practitionerId}/patients/${params.patientId}/allergies`}></Tab>
        <Tab key='documents' title='Documentos'>
          <PatientDocuments />
        </Tab>
      </Tabs>
    </div>
  );
}

import { Card } from '@/components/ui/card';
import { User, FileText } from 'lucide-react';

export default function PractitionerHome() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-5 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-24 2xl:px-32 py-0 relative self-stretch w-full mt-6 mb-6 flex-[0_0_auto]">
        <Card
          link="practitioner/undefined/patients"
          card_title="Patients"
          icon={
            <User
              color="white"
              className="w-5 h-[18px] left-[2px] top-[3px] absolute"
            />
          }
          heading_one="Name"
          heading_two="ID"
          cardData={[
            { col1: 'Jhon Doe', col2: '18273645' },
            { col1: 'Jhon Doe', col2: '18273645' },
            { col1: 'Jhon Doe', col2: '18273645' },
          ]}
        />
        <Card
          link="practitioner/undefined/health-records"
          card_title="Health Records"
          icon={
            <FileText
              color="white"
              className="w-4 h-5 left-[4px] top-[2px] absolute"
            />
          }
          heading_one="Detail"
          heading_two="Date"
          cardData={[
            { col1: 'Allergic reaction', col2: '24/09/2023' },
            { col1: 'Consultation', col2: '24/09/2023' },
            { col1: 'Treatment', col2: '24/09/2023' },
          ]}
        />
      </div>
    </>
  );
}
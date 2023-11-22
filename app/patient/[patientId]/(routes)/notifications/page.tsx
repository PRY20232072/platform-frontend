"use client";

import { Button, Input } from '@nextui-org/react';

import {
  accessRequestTableColumns,
  practitionersAccessRequests,
  eventsTableColumns,
  events,
} from '@/data/data';
import { getServerSession } from 'next-auth/next';
import { CustomAutocomplete } from '@/components/ui/auto-complete';
import { User2, Pencil } from 'lucide-react';
import { AccessRequestTable } from './components/access-request-table';
import { EventsTable } from './components/events-table';
import { useSession } from 'next-auth/react';

export default function NotificationPage() {


  return (
    <div className="flex flex-col  items-center gap-5 px-4 py-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-32">
      <div className="justify-between items-center  border-b border-gray-200 flex w-full max-w-[1100px] gap-5 mt-1 max-md:max-w-full max-md:flex-wrap">
        <div className="flex grow basis-[0%] flex-col items-stretch my-auto max-md:max-w-full">
          <div className="mb-4 text-4xl font-bold leading-10 max-md:max-w-full">
            Notifications Center
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="mb-4 font-bold text-2xl tracking-[0] leading-[24px]">
            Access Request
          </div>

          <AccessRequestTable />
        </div>
        {/* <div className="mb-8">
          <div className="  mb-4 font-bold  text-2xl tracking-[0] leading-[24px]">
            Platform events
          </div>
          <EventsTable items={events} columns={eventsTableColumns} />
        </div> */}
      </div>
    </div>
  );
}

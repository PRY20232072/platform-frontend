"use client";

import PractitionerProfileBasicInfo from "./components/profile-basic-info";
import PractitionerProfileForm from "./components/profile-form";

export default function PractitionerProfile() {
  return (
    <div className="flex flex-col  items-center gap-5 px-4 py-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-32">
      <PractitionerProfileBasicInfo />
      <PractitionerProfileForm />
    </div>
  );
}
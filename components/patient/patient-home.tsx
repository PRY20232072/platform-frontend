import { CardDemographic } from "@/components/patient/card-demographic";
import CardFamilyRecords from "./card-family-records";
import CardAllergies from "./card-allergies";

export default function PatientHome() {
  return (
    <>
      <div className="flex flex-col items-center gap-5 sm:gap-10 md:gap-14 lg:gap-20 xl:gap-24 2xl:gap-28 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-24 2xl:px-32 py-5 relative self-stretch w-full flex-[0_0_auto]">
        <CardDemographic />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-24 2xl:px-32 py-0 relative self-stretch w-full mb-6 flex-[0_0_auto]">
        <CardFamilyRecords />
        <CardAllergies />
      </div>
    </>
  );
}

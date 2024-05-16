import { CardDemographic } from "@/components/patient/card-demographic";
import CardFamilyRecords from "./card-family-records";
import CardAllergies from "./card-allergies";
import CardAttentions from "./card-attentions";

export default function PatientHome() {
  return (
    <div className="flex flex-col w-full max-w-[920px] mx-auto gap-5 my-5">
      <div className="flex flex-col gap-5">
        <CardDemographic />
        <CardAttentions />
      </div>
      <div className="flex max-md:flex-col gap-5">
        <CardFamilyRecords />
        <CardAllergies />
      </div>
    </div>
  );
}

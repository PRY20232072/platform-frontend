import CardPatients from "./card-patients";
import CardHealthRecords from "./card-health-records";

export default function PractitionerHome() {
  return (
    <>
      <div className='flex flex-wrap items-center justify-center gap-5 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-24 2xl:px-32 py-0 relative self-stretch w-full mt-6 mb-6 flex-[0_0_auto]'>
        <CardPatients />
        <CardHealthRecords />
      </div>
    </>
  );
}

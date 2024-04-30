import CardPatients from "./card-patients";
import CardHealthRecords from "./card-health-records";

export default function PractitionerHome() {
  return (
    <>
      <div className='flex flex-col items-center gap-5 w-full mt-6 mb-6'>
        <CardPatients className="!max-w-[700px] !w-full"/>
        <CardHealthRecords className="!max-w-[700px] !w-full" />
      </div>
    </>
  );
}

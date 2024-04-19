import CustomSuspense from "@/components/custom-suspense";
import Loading from "@/components/loading";
import { useSession } from "next-auth/react";
import { Pill } from "lucide-react";
export default function AllergyPatientBasicInfo() {
  const { data: session } = useSession();

  return (
    <CustomSuspense
      isLoading={session?.user === undefined}
      fallback={<Loading />}
    >
      <div className='flex flex-wrap justify-between items-center border-b border-gray-200 w-full max-w-[1100px] mt-1 mx-auto md:flex-nowrap'>
        <div className='flex flex-grow flex-col items-center p-4 text-center md:items-stretch md:text-left'>
          <h2 className='text-4xl font-bold leading-10 mb-2'>Alergias</h2>
          <p className='text-neutral-400 text-xl md:text-2xl leading-10'>
            {session?.user?.name} | {session?.user?.email}
          </p>
          <p className='text-neutral-400 text-base leading-10'>
            ID: {session?.user?.id}
          </p>
        </div>
        <div className='relative w-full max-w-[116px] h-[115.5px] md:block hidden'>
          <div
            className='w-full h-full flex justify-center items-center bg-blue-600 rounded-2xl'
            style={{ padding: "6px" }}
            aria-label='Pill'
          >
            <Pill className='w-12 h-12 text-white' color='white' />
          </div>
        </div>
      </div>
    </CustomSuspense>
  );
}

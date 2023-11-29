import CustomSuspense from "@/components/custom-suspense";
import Loading from "@/components/loading";
import { useSession } from "next-auth/react";

export default function AllergyPatientBasicInfo() {
  const { data: session } = useSession();

  return (
    <CustomSuspense isLoading={session?.user === undefined} fallback={<Loading />}>
      <div className="justify-between items-center border-b border-gray-200 flex w-full max-w-[1100px] gap-5 mt-1 max-md:max-w-full max-md:flex-wrap">
        <div className="flex grow basis-[0%] flex-col items-stretch my-auto max-md:max-w-full">
          <div className="text-4xl font-bold leading-10 max-md:max-w-full">
            Allergy History
          </div>
          <div className="justify-center text-neutral-400 text-2xl leading-10 max-md:max-w-full">
            {session?.user?.name} | {session?.user?.email}
          </div>
          <div className="justify-center text-neutral-400 text-base leading-10 max-md:max-w-full">
            ID: {session?.user?.id}
          </div>
        </div>
      </div>
    </CustomSuspense>
  );
}
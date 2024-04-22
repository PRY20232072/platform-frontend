import { AllergyClient } from "./components/allergy-client";
const AllergyPage = async () => {
  return (
    <div className='flex flex-col gap-5 px-4 py-4 md:px-8 lg:px-16 xl:px-20 2xl:px-32 items-stretch'>
      <div className='justify-between items-center border-b border-gray-200 flex w-full max-w-[1100px] gap-5 mt-1 max-md:max-w-full max-md:flex-wrap'>
        <div className='flex grow basis-[0%] flex-col items-stretch my-auto max-md:max-w-full'>
          <div className='mb-2 text-4xl font-bold leading-10 max-md:max-w-full'>
            Información del registro de alergia
          </div>
        </div>
      </div>
      <AllergyClient />
    </div>
  );
};

export default AllergyPage;

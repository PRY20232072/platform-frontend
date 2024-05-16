import { AllergyClient } from "./components/allergy-client";

const AllergyPage = () => {
  return (
    <div className='w-full max-w-[920px] mx-auto mt-6'>
      <div className='mb-6 text-4xl font-bold leading-10'>
        Información del registro de alergia
      </div>
      <AllergyClient />
    </div>
  );
};

export default AllergyPage;

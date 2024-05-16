import { FamilyRecordClient } from './components/family-record-client';
const FamilyRecordPage = async () => {
  return (
    <div className='w-full max-w-[920px] mx-auto mt-6'>
      <div className='mb-6 text-4xl font-bold leading-10'>
        Información del registro familiar
      </div>
      <FamilyRecordClient />
    </div>
  );
};

export default FamilyRecordPage;

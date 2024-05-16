import AttentionClient from "./components/attention-client";

const AttentionPage = () => {
  return (
    <div className='w-full max-w-[920px] mx-auto mt-6'>
      <div className='mb-6 text-4xl font-bold leading-10'>
        Resumen de atención
      </div>
      <AttentionClient />
    </div>
  );
};

export default AttentionPage;
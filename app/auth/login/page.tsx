import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { AzureButton } from "./components/azure-button";
export default async function SignInPage() {
  return (
    <div className='relative flex overflow-hidden w-full h-full bg-cover bg-center'>
      <div className='flex items-center justify-center w-full h-full bg-opacity-50'>
        <Card className='max-w-md w-full dark:bg-white shadow-lg rounded-lg'>
          <CardHeader className='py-4 px-6'>
            <h2 className='text-center text-2xl font-bold text-gray-800'>
              Iniciar sesión
            </h2>
          </CardHeader>
          <CardBody className='py-6 px-8'>
            <div className='text-center text-lg font-normal text-gray-600 mb-4'>
              Bienvenido de vuelta!
            </div>
            <AzureButton />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

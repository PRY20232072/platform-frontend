"use client";

import { Button, Image } from "@nextui-org/react";
import { signIn } from "next-auth/react";

import { useSearchParams } from "next/navigation";

export const AzureButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "azure-ad-b2c") => {
    signIn(provider, {
      callbackUrl: callbackUrl || "/",
    });
  };

  return (
    <div className='flex items-center w-full gap-x-2 mt-2'>
      <Button
        size='lg'
        className='w-full'
        color='primary'
        variant='ghost'
        onClick={() => onClick("azure-ad-b2c")}
      >
        Iniciar sesión con Azure Active Directory B2C
      </Button>
    </div>
  );
};

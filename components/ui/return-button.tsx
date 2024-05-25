"use client";
import { Button } from "@nextui-org/react";

const ReturnButton = ({
  className,
}: { className?: string}) => {
  return (
    <Button
      className={"font-medium w-[77px] absolute right-0 mr-4 sm:mr-6 md:mr-8 lg:mr-16 xl:mr-20 2xl:mr-32 mt-2 " + (className || '')}
      onClick={() => {
        window.history.back();
      }}
    >
      Regresar
    </Button>
  );
};

export default ReturnButton;

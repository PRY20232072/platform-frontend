"use client";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import React from "react";

interface LogoutModalProps {
  isOpen: boolean;
}
import { redirect, useRouter } from "next/navigation";

export const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen }) => {
  const { onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  return (
    <>
      <Modal
        backdrop='blur'
        isOpen={isOpen}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1 text-black dark:text-white'>
                Tu sesion ha expirado
              </ModalHeader>
              <ModalBody className='text-black dark:text-white'>
                Por favor vuelve a iniciar sesion
              </ModalBody>
              <ModalFooter>
                <Button color='primary' onClick={() =>
                  router.push(
                    `https://${process.env.TENANT_NAME}.b2clogin.com/${process.env.TENANT_NAME}.onmicrosoft.com/${process.env.USER_FLOW}/oauth2/v2.0/logout?post_logout_redirect_uri=${process.env.AUTH_URL}/auth/signout`
                  )
                }>Aceptar</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

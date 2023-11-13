'use client';
import React from 'react';
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from '@nextui-org/navbar';

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  user,
} from '@nextui-org/react';
import Link from 'next/link';
import { ThemeSwitch } from '@/components/theme-switch';
import { MainNavbar } from '@/components/main-navbar';

interface NavMenuProps {
  userEmail: any;
}

export function NavMenu({ userEmail }: NavMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const uemail = userEmail?.user?.email;
  const uname = userEmail?.user?.name;
  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      className="h-20 py-5 shadow justify-center inline-flex"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand as="li" className="gap-5 max-w-fit">
          <Link className="flex justify-start items-center gap-5 " href="/">
            <div className="w-10 h-10 bg-black bg-opacity-10 rounded-[100px]" />
            <p className="grow shrink basis-0 text-blue-600 text-[28px] font-bold leading-9">
              Plataforma
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden  sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {userEmail ? <MainNavbar className="mx-6" /> : ''}
        <ThemeSwitch />

        {userEmail ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                showFallback
                name={uname}
                src="https://images.unsplash.com/broken"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{uemail}</p>
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          ''
        )}
      </NavbarContent>
    </NextUINavbar>
  );
}

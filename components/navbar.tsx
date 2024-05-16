import React from 'react';
import  NavMenu  from '@/components/nav-menu';

interface NavbarProps {
  isLoggedIn: any;
}

export const Navbar = ({isLoggedIn}: NavbarProps) => {
  return <NavMenu userEmail={isLoggedIn}/>;
};

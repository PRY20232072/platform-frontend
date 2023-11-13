'use client';
import { Kbd } from '@nextui-org/kbd';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';


export function MainNavbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `/`,
      label: 'Overview',
      active: pathname === `/`,
    },
    {
      href: `/patient/${params.userId}/demographic`,
      label: 'Demographic information',
      active: pathname === `/patient/${params.userId}/demographic`,
    },
    /* {
      href: `/patient/${params.userId}/family-history`,
      label: 'Historial Familiar',
      active: pathname === `/${params.userId}/family-history`,
    }, */
    {
      href: `/patient/${params.userId}/allergy-intolerance`,
      label: 'Allergies',
      active: pathname === `/patient/${params.userId}/allergy-intolerance`,
    },
  ];
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active
              ? 'text-primary' 
              : 'text-black dark:text-white'
          )}
        >
          {route.label}
        </Link>
      ))}
      
    </nav>
     
  );
}

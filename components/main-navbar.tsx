'use client';
import { Kbd } from '@nextui-org/kbd';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

export function MainNavbar({
  className,
  userRole,
  ...props
}: React.HTMLAttributes<HTMLElement> & { userRole: string }) {
  const pathname = usePathname();
  const params = useParams();
  const patient_routes = [
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

  const practioners_routes = [
    {
      href: `/`,
      label: 'Overview',
      active: pathname === `/`,
    },
    {
      href: `/practitioner/${params.userId}/patients`,
      label: 'Patients',
      active: pathname === `/practitioner/${params.userId}/patients`,
    },
    {
      href: `/practitioner/${params.userId}/health-records`,
      label: 'Health Records',
      active: pathname === `/practitioner/${params.userId}/health-records`,
    },
  ];

  const routes = userRole === 'patient' ? patient_routes : practioners_routes;

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
            route.active ? 'text-primary' : 'text-black dark:text-white'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}

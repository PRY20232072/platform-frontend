'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

export function MainNavbar({
  className,
  userRole,
  userId,
  ...props
}: React.HTMLAttributes<HTMLElement> & { userRole: string, userId: string }) {
  const pathname = usePathname();
  const params = useParams();
  const patient_routes = [
    {
      href: `/`,
      label: 'Overview',
      active: pathname === `/`,
    },
    {
      href: `/patient/${userId}/demographic`,
      label: 'Demographic information',
      active: pathname === `/patient/${userId}/demographic`,
    },
    {
      href: `/patient/${userId}/family-records`,
      label: 'Family Records',
      active: pathname === `/patient/${userId}/family-records`,
    }, 
    {
      href: `/patient/${userId}/allergy-intolerance`,
      label: 'Allergies',
      active: pathname === `/patient/${userId}/allergy-intolerance`,
    },
  ];

  const practioners_routes = [
    {
      href: `/`,
      label: 'Overview',
      active: pathname === `/`,
    },
    {
      href: `/practitioner/${userId}/patients`,
      label: 'Patients',
      active: pathname === `/practitioner/${userId}/patients`,
    },
    {
      href: `/practitioner/${userId}/health-records`,
      label: 'Health Records',
      active: pathname === `/practitioner/${userId}/health-records`,
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

"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNavbar({
  className,
  userRole,
  userId,
  ...props
}: React.HTMLAttributes<HTMLElement> & { userRole: string; userId: string }) {
  const pathname = usePathname();
  const patient_routes = [
    {
      href: `/`,
      label: "Información General",
      active: pathname === `/`,
    },
    {
      href: `/patient/${userId}/attention-history`,
      label: "Historial de atenciones",
      active: pathname === `/patient/${userId}/attention-history`,
    },
    {
      href: `/patient/${userId}/demographic`,
      label: "Información demográfica",
      active: pathname === `/patient/${userId}/demographic`,
    },
    {
      href: `/patient/${userId}/family-records`,
      label: "Historial familiar",
      active: pathname === `/patient/${userId}/family-records`,
    },
    {
      href: `/patient/${userId}/allergy-intolerance`,
      label: "Alergias",
      active: pathname === `/patient/${userId}/allergy-intolerance`,
    },
    {
      href: `/patient/${userId}/documents`,
      label: "Documentos",
      active: pathname === `/patient/${userId}/documents`,
    },
    {
      href: `/patient/${userId}/access`,
      label: "Accesos",
      active: pathname === `/patient/${userId}/access`,
    }
  ];

  const practioners_routes = [
    {
      href: `/`,
      label: "Información General",
      active: pathname === `/`,
    },
    {
      href: `/practitioner/${userId}/patients`,
      label: "Pacientes",
      active: pathname === `/practitioner/${userId}/patients`,
    }
  ];

  const routes = userRole === "patient" ? patient_routes : practioners_routes;

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary dark:hover:text-primary",
            route.active ? "text-primary" : "text-black dark:text-white"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}

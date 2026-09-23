// src/app/admin/layout.tsx
"use client";

import Sidebar from "../../components/Sidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const esLogin = pathname === "/admin/login";

  // Si está en la página de login, muestra solo el formulario sin el Sidebar
  if (esLogin) {
    return <main className="w-full min-h-screen bg-gray-100">{children}</main>;
  }

  // Para el resto del panel admin, muestra el Sidebar y el contenido empujado con ml-64
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-6">{children}</main>
    </div>
  );
}
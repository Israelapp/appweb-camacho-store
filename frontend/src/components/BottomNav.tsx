"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="flex justify-between w-full bg-white p-4 fixed bottom-0 left-0">
      <Link href="/" className={pathname === "/" ? "text-blue-600" : "text-gray-500"}>
        Reservas
      </Link>
      <Link href="/inventario" className={pathname === "/inventario" ? "text-blue-600" : "text-gray-500"}>
        Inventario
      </Link>
      <Link href="/reportes" className={pathname === "/reportes" ? "text-blue-600" : "text-gray-500"}>
        Reportes
      </Link>
      <Link href="/clientes" className={pathname === "/clientes" ? "text-blue-600" : "text-gray-500"}>
        Clientes
      </Link>
    </div>
  );
}
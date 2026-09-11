"use client";
import { LayoutDashboard, ClipboardList, Package, BarChart3, Users, DollarSign } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 h-full bg-white p-4 fixed left-0 top-0 border-r border-gray-100">
      <Link href="/" className="text-xl font-bold text-brand mb-6 block">
        Camacho Store
      </Link>

      <Link href="/" className={`flex items-center gap-2 p-2 rounded-lg mb-1 ${pathname === "/" ? "bg-brand text-white" : "text-gray-600 hover:bg-gray-50"}`}>
        <LayoutDashboard size={20} />
        Dashboard
      </Link>

      <Link href="/reservas" className={`flex items-center gap-2 p-2 rounded-lg mb-1 ${pathname === "/reservas" ? "bg-brand text-white" : "text-gray-600 hover:bg-gray-50"}`}>
        <ClipboardList size={20} />
        Reservas
      </Link>
      <Link href="/inventario" className={`flex items-center gap-2 p-2 rounded-lg mb-1 ${pathname === "/inventario" ? "bg-brand text-white" : "text-gray-600 hover:bg-gray-50"}`}>
        <Package size={20} />
        Inventario
      </Link>
      <Link href="/reportes" className={`flex items-center gap-2 p-2 rounded-lg mb-1 ${pathname === "/reportes" ? "bg-brand text-white" : "text-gray-600 hover:bg-gray-50"}`}>
        <BarChart3 size={20} />
        Reportes
      </Link>
      <Link href="/clientes" className={`flex items-center gap-2 p-2 rounded-lg mb-1 ${pathname === "/clientes" ? "bg-brand text-white" : "text-gray-600 hover:bg-gray-50"}`}>
        <Users size={20} />
        Clientes
      </Link>
      <Link href="/pago" className={`flex items-center gap-2 p-2 rounded-lg mb-1 ${pathname === "/pago" ? "bg-brand text-white" : "text-gray-600 hover:bg-gray-50"}`}>
        <DollarSign size={20} />
        Pagos
      </Link>
    </div>
  );
}
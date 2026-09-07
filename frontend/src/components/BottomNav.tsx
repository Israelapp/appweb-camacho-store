"use client";
import { ClipboardList, Package, BarChart3, Users, DollarSign } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="flex justify-between w-full bg-white p-4 fixed bottom-0 left-0">
      <Link href="/reservas" className= {`flex flex-col items-center ${pathname === "/reservas" ? "text-blue-600" : "text-gray-500"}`}>
        <ClipboardList size={20} />
        Reservas
      </Link>
      <Link href="/inventario" className=  {`flex flex-col items-center ${pathname === "/inventario" ? "text-blue-600" : "text-gray-500"}`}>
        <Package size= {20}/>
        Inventario
      </Link>
      <Link href="/reportes" className= {`flex flex-col items-center ${pathname === "/reportes" ? "text-blue-600" : "text-gray-500"}`}>

      <BarChart3 size= {20} />
        Reportes
      </Link>
      <Link href="/clientes" className= {`flex flex-col items-center  ${pathname === "/clientes" ? "text-blue-600" : "text-gray-500"}`}>
        <Users size={20}/>
        Clientes
      </Link>

       <Link href="/pago" className={`flex flex-col items-center  ${pathname === "/pago" ? "text-blue-600" : "text-gray-500"}`}>

        <DollarSign size= {20} />
          Pagos
      </Link>
    </div>
  );
}
"use client";

import { 
  LayoutDashboard, 
  ClipboardList, 
  Package, 
  BarChart3, 
  Users, 
  DollarSign, 
  LogOut 
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    // Elimina la cookie de autenticación de admin
    document.cookie = "admin_token=; path=/; max-age=0;";
    router.push("/admin/login");
    router.refresh();
  }

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Reservas", href: "/admin/reservas", icon: ClipboardList },
    { name: "Inventario", href: "/admin/inventario", icon: Package },
    { name: "Reportes", href: "/admin/reportes", icon: BarChart3 },
    { name: "Clientes", href: "/admin/clientes", icon: Users },
    { name: "Pagos", href: "/admin/pago", icon: DollarSign },
  ];

  return (
    <div className="flex flex-col justify-between w-64 h-full bg-white p-4 fixed left-0 top-0 border-r border-gray-100">
      <div>
        <Link href="/admin" className="text-xl font-bold text-brand mb-6 block">
          Camacho Store
        </Link>

        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-brand text-white font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full font-medium"
      >
        <LogOut size={20} />
        Cerrar Sesión
      </button>
    </div>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4 flex flex-col gap-6 print:hidden">
      {/* Logo / Título */}
      <div className="px-2">
        <h2 className="text-xl font-black text-brand">Camacho Store</h2>
        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
          Panel de Control
        </p>
      </div>

      {/* Menú de Navegación */}
      <nav className="flex flex-col gap-1">
        <Link
          href="/admin"
          className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            pathname === "/admin"
              ? "bg-blue-50 text-blue-600 shadow-sm"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          📊 Panel Principal
        </Link>
      </nav>
    </aside>
  );
}
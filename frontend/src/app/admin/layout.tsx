// src/app/admin/layout.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Si está en el login de admin, no mostrar la barra lateral
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = () => {
    document.cookie = "admin_token=; path=/; max-age=0;";
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Barra lateral solo visible en /admin */}
      <aside className="w-64 bg-slate-900 text-white min-h-screen p-5 flex flex-col justify-between shadow-xl print:hidden shrink-0">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-black text-blue-400">Camacho Store</h2>
            <p className="text-xs text-slate-400">Panel de Control</p>
          </div>

          <nav className="flex flex-col gap-2">
            <Link
              href="/admin"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                pathname === "/admin"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              📊 Panel Principal
            </Link>

            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
            >
              🏪 Ver Tienda Pública
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full bg-rose-600/10 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/20 px-4 py-3 rounded-xl text-xs font-bold transition-all"
        >
          🚪 Cerrar Sesión
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-8 overflow-y-auto print:p-0 print:bg-white">
        {children}
      </main>
    </div>
  );
}
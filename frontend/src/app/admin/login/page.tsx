"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setCargando(true);

    // 🔑 AQUÍ DEFINES LA CONTRASEÑA (Usa la variable de entorno o "1234" por defecto)
    const CLAVE_CORRECTA = process.env.NEXT_PUBLIC_ADMIN_PIN || "1234";

    if (password === CLAVE_CORRECTA) {
      // Guardar cookie de sesión para el Admin (expira en 1 día)
      document.cookie = `admin_token=autenticado; path=/; max-age=86400; SameSite=Lax`;
      
      // Redirigir al panel de administración
      router.push("/admin");
      router.refresh();
    } else {
      setError("Contraseña incorrecta");
    }

    setCargando(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Camacho Store</h1>
          <p className="text-sm text-gray-500 mt-1">Acceso de Administrador</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña / PIN
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 mt-2"
          >
            {cargando ? "Verificando..." : "Ingresar al Panel"}
          </button>
        </form>
      </div>
    </div>
  );
}
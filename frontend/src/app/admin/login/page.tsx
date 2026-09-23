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

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        // Guardar cookie de sesión para el Admin (expira en 1 día)
        document.cookie = `admin_token=${data.token}; path=/; max-age=86400; SameSite=Lax`;
        
        // Redirigir al panel de administración
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.mensaje || "Contraseña incorrecta");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Error de conexión con el servidor");
    } finally {
      setCargando(false);
    }
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
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-brand text-white p-3 rounded-lg font-bold hover:bg-brand-dark transition-colors disabled:opacity-50 mt-2"
          >
            {cargando ? "Verificando..." : "Ingresar al Panel"}
          </button>
        </form>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InventarioForm() {
  const router = useRouter();
  const [litros, setLitros] = useState<string | number>("");
  const [cargando, setCargando] = useState(false);
  const CAPACIDAD_MAXIMA = 12000;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cantidadLitros = Number(litros);
    if (isNaN(cantidadLitros) || cantidadLitros < 0 || cantidadLitros > CAPACIDAD_MAXIMA) {
      alert(`Por favor ingresa un valor válido entre 0 y ${CAPACIDAD_MAXIMA} litros.`);
      return;
    }

    setCargando(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/inventario`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ litros: cantidadLitros }),
      });

      if (res.ok) {
        setLitros("");
        router.refresh(); // Refresca los datos del Server Component en el dashboard
        alert("¡Nivel de tanques actualizado con éxito!");
      } else {
        console.error("Error al actualizar el inventario en el servidor");
      }
    } catch (error) {
      console.error("Error de red:", error);
    } finally {
      setCargando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-white rounded-xl shadow-md max-w-md mx-auto">
      <div>
        <h3 className="text-lg font-bold text-slate-800">💧 Control de Tanques de Agua</h3>
        <p className="text-sm text-slate-600 mt-1">
          Capacidad máxima del sistema: <span className="font-semibold">{CAPACIDAD_MAXIMA.toLocaleString()} Litros</span> 
          <span className="block text-xs text-slate-500 mt-0.5">(9,000L en tanques grandes + 3,000L en tanques medianos)</span>
        </p>
      </div>

      <input
        type="number"
        value={litros}
        onChange={(e) => setLitros(e.target.value)}
        placeholder="Litros actuales en los tanques"
        min="0"
        max={CAPACIDAD_MAXIMA}
        required
        className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        disabled={cargando}
        className="bg-brand text-white p-2 rounded-lg font-medium hover:bg-brand-dark transition-colors disabled:opacity-50"
      >
        {cargando ? "Actualizando..." : "Actualizar Nivel de Tanques"}
      </button>
    </form>
  );
}
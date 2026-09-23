"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductoForm() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState<string | number>("");
  const [precio, setPrecio] = useState<string | number>("");
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim()) return;

    setCargando(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/producto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          cantidad: Number(cantidad) || 0,
          precio: Number(precio) || 0,
        }),
      });

      if (res.ok) {
        setNombre("");
        setCantidad("");
        setPrecio("");
        router.refresh(); // Refresca los datos del Server Component automáticamente
      } else {
        console.error("Error al crear el producto");
      }
    } catch (error) {
      console.error("Error de red:", error);
    } finally {
      setCargando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
        required
        className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <input
        type="number"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
        placeholder="Cantidad"
        min="0"
        required
        className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        step="0.01"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        placeholder="Precio"
        min="0"
        required
        className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        disabled={cargando}
        className="bg-brand text-white p-2 rounded-lg font-medium hover:bg-brand-dark transition-colors disabled:opacity-50"
      >
        {cargando ? "Guardando..." : "Crear Producto"}
      </button>
    </form>
  );
}
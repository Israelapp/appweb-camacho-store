"use client"

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function ProductoForm(){
    const router = useRouter();
    const [nombre, setNombre] = useState ("");
    const [cantidad, setCantidad] = useState (0);
    const [precio,setPrecio] = useState (0);

    async function handleSubmit(e:React.FormEvent) 
    {
        e.preventDefault ();

        await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/producto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, cantidad, precio }),
    });
        setNombre ("");
        setCantidad (0);
        setPrecio (0);
    }

        return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
        className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        value={cantidad}
        onChange={(e) => setCantidad(Number(e.target.value))}
        placeholder= "Cantidad"
        className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

       <input
        type="number"
        value={precio}
        onChange={(e) => setPrecio(Number(e.target.value))}
        placeholder="Precio"
        className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"

        />

        <button type="submit" className="bg-brand text-white p-2 rounded-lg font-medium hover:bg-brand-dark transition-colors">
        Crear Producto
      </button>
    </form>
    );
}
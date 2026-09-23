"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ClienteForm() {
    const router = useRouter();
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [cargando, setCargando] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!nombre.trim()) return;

        setCargando(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clientes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, telefono, direccion }),
            });

            if (res.ok) {
                setNombre("");
                setTelefono("");
                setDireccion("");
                router.refresh(); // Refresca los Server Components para mostrar el nuevo cliente
            } else {
                console.error("Error al crear el cliente");
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
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Teléfono"
                className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Dirección"
                className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                type="submit"
                disabled={cargando}
                className="bg-brand text-white p-2 rounded-lg font-medium hover:bg-brand-dark transition-colors disabled:opacity-50"
            >
                {cargando ? "Guardando..." : "Cliente Nuevo"}
            </button>
        </form>
    );
}
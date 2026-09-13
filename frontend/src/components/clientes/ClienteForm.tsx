"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"


export default function ClienteForm() {
    const router = useRouter();
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        await fetch("http://NEXT_PUBLIC_API_URL/api/clientes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, telefono, direccion }),
        });

        setNombre("");
        setTelefono("");
        setDireccion("");
    }

    return (
        < form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
                className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Telefono"
                className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Direccion"
                className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button type="submit" className="bg-brand text-white p-2 rounded-lg font-medium hover:bg-brand-dark transition-colors">
                Cliente Nuevo
            </button>

        </form>
    );
}


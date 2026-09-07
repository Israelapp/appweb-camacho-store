"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReservaForm() {
  const router = useRouter();
  const [cliente, setCliente] = useState("");
  const [litros, setLitros] = useState(0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("http://127.0.0.1:5000/api/reservas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cliente, litros }),
    });

    setCliente("");
    setLitros(0);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
      <input
        type="text"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
        placeholder="Cliente"
        className="border p-2"
      />
      <input
        type="number"
        value={litros}
        onChange={(e) => setLitros(Number(e.target.value))}
        placeholder="Litros"
        className="border p-2"
      />
      <button type="submit" className="bg-blue-600 text-white p-2">
        Crear reserva
      </button>
    </form>
  );
}
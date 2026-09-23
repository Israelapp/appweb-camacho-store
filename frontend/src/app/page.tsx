// src/app/page.tsx
"use client";

import { useState } from "react";
import PagoForm from "../components/pagos/PagoForm";

export default function HomePage() {
  // Estado para alternar entre "reserva" y "pago"
  const [opcionActiva, setOpcionActiva] = useState<"reserva" | "pago">("reserva");

  // Estados para el formulario de Reserva
  const [clienteReserva, setClienteReserva] = useState("");
  const [litros, setLitros] = useState<number | string>(20);
  const [fechaReserva, setFechaReserva] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [cargandoReserva, setCargandoReserva] = useState(false);
  const [mensajeReserva, setMensajeReserva] = useState(false);

  const PRECIO_POR_LITRO = 0.50; // Ajusta el precio según tu tarifa
  const totalEstimado = (Number(litros) || 0) * PRECIO_POR_LITRO;

  // Manejador para enviar Reserva
  async function handleReservaSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!clienteReserva.trim() || !litros) return;

    setCargandoReserva(true);
    setMensajeReserva(false);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reserva`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cliente: clienteReserva,
          litros: Number(litros),
          total: totalEstimado,
          fecha: fechaReserva,
        }),
      });

      if (res.ok) {
        setMensajeReserva(true);
        setClienteReserva("");
        setLitros(20);
      } else {
        alert("Error al guardar la reserva");
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("Error de conexión al guardar la reserva.");
    } finally {
      setCargandoReserva(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-5">
        
        {/* Encabezado */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand">Camacho Store</h1>
          <p className="text-sm text-gray-500">Recarga de agua purificada</p>
        </div>

        {/* Selector de Pestañas / Opciones */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-gray-100 rounded-xl">
          <button
            type="button"
            onClick={() => setOpcionActiva("reserva")}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              opcionActiva === "reserva"
                ? "bg-white text-brand shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            📋 Crear Reserva
          </button>
          <button
            type="button"
            onClick={() => setOpcionActiva("pago")}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              opcionActiva === "pago"
                ? "bg-white text-brand shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            💳 Método de Pago
          </button>
        </div>

        {/* OPCCIÓN 1: Formulario de Reserva */}
        {opcionActiva === "reserva" && (
          <form onSubmit={handleReservaSubmit} className="flex flex-col gap-3">
            {mensajeReserva && (
              <div className="p-3 bg-green-50 text-green-800 border border-green-200 rounded-lg text-sm text-center font-medium">
                ¡Reserva creada con éxito!
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">
                Cliente
              </label>
              <input
                type="text"
                value={clienteReserva}
                onChange={(e) => setClienteReserva(e.target.value)}
                placeholder="Nombre del cliente"
                required
                className="border border-gray-300 p-2.5 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">
                Cantidad de Litros
              </label>
              <input
                type="number"
                min="1"
                value={litros}
                onChange={(e) => setLitros(e.target.value)}
                placeholder="Cantidad de litros"
                required
                className="border border-gray-300 p-2.5 rounded-lg w-full text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">
                Fecha de entrega / Reserva
              </label>
              <input
                type="date"
                value={fechaReserva}
                onChange={(e) => setFechaReserva(e.target.value)}
                required
                className="border border-gray-300 p-2.5 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100 my-1">
              <span className="text-xs font-bold text-gray-500">Total estimado:</span>
              <span className="text-lg font-black text-brand">${totalEstimado.toFixed(2)}</span>
            </div>

            <button
              type="submit"
              disabled={cargandoReserva}
              className="bg-brand text-white p-3 rounded-lg font-bold hover:bg-brand-dark transition-colors disabled:opacity-50 mt-1"
            >
              {cargandoReserva ? "Guardando..." : "Crear Reserva"}
            </button>
          </form>
        )}

        {/* OPCIÓN 2: Formulario de Pago */}
        {opcionActiva === "pago" && (
          <div>
            <PagoForm />
          </div>
        )}

      </div>
    </div>
  );
}
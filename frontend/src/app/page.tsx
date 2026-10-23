"use client";

import { useEffect, useState } from "react";
import PagoForm from "../components/pagos/PagoForm";
import QrDescarga from "../components/QrDescarga";
import GeneradorAI from "../components/inventario/GeneradorAI";
import { supabase } from "../lib/supabase";
import { obtenerTasaBCV } from "../lib/Bcv.Services";

export default function HomePage() {
  const [opcionActiva, setOpcionActiva] = useState<"reserva" | "pago" | "ia">("reserva");

  // Estados para Reserva
  const [clienteReserva, setClienteReserva] = useState("");
  const [litros, setLitros] = useState<number | string>(0);
  const [fechaReserva, setFechaReserva] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [cargandoReserva, setCargandoReserva] = useState(false);
  const [mensajeReserva, setMensajeReserva] = useState(false);

  // Estado para la tasa oficial del BCV
  const [tasaBCV, setTasaBCV] = useState<number>(0);

  // 💧 REGLA DE PRECIOS: $0.80 USD por cada botellón de 19 Litros ($0.0421 USD / Litro)
  const PRECIO_POR_LITRO = 0.80 / 19; 
  const totalEstimadoUSD = (Number(litros) || 0) * PRECIO_POR_LITRO;
  const totalEstimadoVES = tasaBCV > 0 ? totalEstimadoUSD * tasaBCV : 0;

  // Cargar tasa del BCV al montar la página
  useEffect(() => {
    async function cargarTasa() {
      const tasa = await obtenerTasaBCV();
      setTasaBCV(tasa);
    }
    cargarTasa();
  }, []);

  async function handleReservaSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!clienteReserva.trim() || Number(litros) <= 0) {
      alert("Por favor, ingresa el nombre del cliente y una cantidad de litros mayor a 0.");
      return;
    }

    setCargandoReserva(true);
    setMensajeReserva(false);

    try {
      const { error } = await supabase.from("reservas").insert([
        {
          cliente: clienteReserva,
          litros: Number(litros),
          total: totalEstimadoUSD,
          fecha: fechaReserva,
        },
      ]);

      if (error) {
        console.error("Error en Supabase:", error.message);
        alert(`Error al guardar la reserva: ${error.message}`);
      } else {
        setMensajeReserva(true);
        setClienteReserva("");
        setLitros(0);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
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

        {/* Selector de Pestañas (3 opciones) */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-gray-100 rounded-xl">
          <button
            type="button"
            onClick={() => setOpcionActiva("reserva")}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              opcionActiva === "reserva"
                ? "bg-white text-brand shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            📋 Reserva
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
            💳 Pago
          </button>
          <button
            type="button"
            onClick={() => setOpcionActiva("ia")}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              opcionActiva === "ia"
                ? "bg-white text-brand shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            ✨ Ficha IA
          </button>
        </div>

        {/* Formulario de Reserva */}
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
                min="0"
                value={litros}
                onChange={(e) => setLitros(e.target.value)}
                placeholder="Ej. 19"
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

            {/* Total estimado en USD ($0.80 por 19L) y Bolívares */}
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100 my-1">
              <div>
                <span className="text-xs font-bold text-gray-500 block">Total estimado:</span>
                {tasaBCV > 0 && (
                  <span className="text-[10px] font-medium text-gray-400">
                    BCV: {tasaBCV.toFixed(2)} Bs/$
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-brand block">
                  ${totalEstimadoUSD.toFixed(2)} USD
                </span>
                {tasaBCV > 0 && (
                  <span className="text-xs font-bold text-emerald-600 block">
                    Bs. {totalEstimadoVES.toFixed(2)}
                  </span>
                )}
              </div>
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

        {/* Formulario de Pago */}
        {opcionActiva === "pago" && (
          <div>
            <PagoForm />
          </div>
        )}

        {/* Generador de Fichas con IA */}
        {opcionActiva === "ia" && (
          <div>
            <GeneradorAI />
          </div>
        )}

        {/* Componente QrDescarga */}
        <QrDescarga />

      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface PagoFormProps {
  clienteInicial?: string;
  montoInicial?: number | string;
  metodoInicial?: string;
  onExito?: () => void;
}

export default function PagoForm({
  clienteInicial = "",
  montoInicial = "",
  metodoInicial = "",
  onExito,
}: PagoFormProps) {
  const router = useRouter();

  // Fecha de hoy por defecto en formato YYYY-MM-DD
  const hoy = new Date().toISOString().split("T")[0];

  const [cliente, setCliente] = useState(clienteInicial);
  const [monto, setMonto] = useState<string | number>(montoInicial);
  const [metodo, setMetodo] = useState(metodoInicial);
  const [fecha, setFecha] = useState(hoy);
  const [cargando, setCargando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState(false);

  // Sincroniza si cambian las props desde el componente padre
  useEffect(() => {
    if (clienteInicial) setCliente(clienteInicial);
    if (montoInicial) setMonto(montoInicial);
    if (metodoInicial) setMetodo(metodoInicial);
  }, [clienteInicial, montoInicial, metodoInicial]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cliente.trim() || !monto) return;

    setCargando(true);
    setMensajeExito(false);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pago`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cliente,
          monto: Number(monto) || 0,
          metodo,
          fecha,
        }),
      });

      if (res.ok) {
        setMensajeExito(true);
        setCliente("");
        setMonto("");
        setMetodo("");
        setFecha(hoy);

        router.refresh();

        // Ejecuta callback si existe (ej. cambiar pantalla o reiniciar carrito)
        if (onExito) {
          onExito();
        }
      } else {
        console.error("Error al registrar el pago");
        alert("No se pudo procesar el pago. Revisa los datos.");
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("Error de conexión con el servidor.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 bg-white rounded-xl shadow-sm">
      {mensajeExito && (
        <div className="p-3 bg-green-50 text-green-800 border border-green-200 rounded-lg text-sm text-center font-medium">
          ¡Pago registrado exitosamente!
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">
          Nombre del Cliente
        </label>
        <input
          type="text"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          placeholder="Ej. Juan Pérez"
          required
          className="border border-gray-200 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">
          Monto ($)
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          placeholder="0.00"
          required
          className="border border-gray-200 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">
          Método de Pago
        </label>
        <input
          type="text"
          value={metodo}
          onChange={(e) => setMetodo(e.target.value)}
          placeholder="Efectivo, Bizum, Transferencia..."
          required
          className="border border-gray-200 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">
          Fecha de Registro
        </label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
          className="border border-gray-200 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={cargando}
        className="bg-brand text-white p-3 rounded-lg font-bold hover:bg-brand-dark transition-colors disabled:opacity-50 mt-2"
      >
        {cargando ? "Procesando Pago..." : "Realizar Pago"}
      </button>
    </form>
  );
}
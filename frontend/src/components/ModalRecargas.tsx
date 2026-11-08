 "use client";

import { useState } from "react";

interface ModalRecargaProps {
  isOpen: boolean;
  onClose: () => void;
  onRecargaExitosas: () => void;
  mostrarNotificacion: (mensaje: string, tipo?: "exito" | "error") => void;
}

export default function ModalRecarga({
  isOpen,
  onClose,
  onRecargaExitosas,
  mostrarNotificacion,
}: ModalRecargaProps) {
  const [litrosRecarga, setLitrosRecarga] = useState<number | string>(12000);
  const [fechaRecarga, setFechaRecarga] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [notasRecarga, setNotasRecarga] = useState("");
  const [cargando, setCargando] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);

    try {
      const response = await fetch("http://localhost:5000/recargas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          litros: Number(litrosRecarga),
          fecha: fechaRecarga,
          notas: notasRecarga,
        }),
      });

      if (response.ok) {
        mostrarNotificacion(`¡Recarga de ${litrosRecarga}L registrada con éxito!`);
        onRecargaExitosas();
        onClose();
        setLitrosRecarga(12000);
        setNotasRecarga("");
      } else {
        mostrarNotificacion("Error al registrar la recarga", "error");
      }
    } catch (err) {
      mostrarNotificacion("Error de conexión con el servidor", "error");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-black text-gray-800">💧 Registrar Ingreso de Agua</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">
              Litros Recibidos / Llenados
            </label>
            <input
              type="number"
              max="12000"
              min="0"
              value={litrosRecarga}
              onChange={(e) => setLitrosRecarga(e.target.value)}
              required
              className="border border-gray-300 p-2.5 rounded-lg w-full text-sm font-semibold focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-[10px] text-gray-400 mt-1 block">
              Capacidad máxima del sistema: 12.000 Litros.
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">
              Fecha de Recarga
            </label>
            <input
              type="date"
              value={fechaRecarga}
              onChange={(e) => setFechaRecarga(e.target.value)}
              required
              className="border border-gray-300 p-2.5 rounded-lg w-full text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">
              Notas / Observaciones (Opcional)
            </label>
            <input
              type="text"
              placeholder="Ej. Llegó a media presión, solo 8.000L..."
              value={notasRecarga}
              onChange={(e) => setNotasRecarga(e.target.value)}
              className="border border-gray-300 p-2.5 rounded-lg w-full text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-200 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={cargando}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition-all shadow-sm disabled:opacity-50"
            >
              {cargando ? "Guardando..." : "Guardar Recarga"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
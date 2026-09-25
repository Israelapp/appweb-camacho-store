"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

interface Reserva {
  id: number;
  cliente: string;
  litros: number;
  total: number;
  fecha: string;
  estado: "pendiente" | "entregado" | "cancelado";
  created_at: string;
}

interface Pago {
  id: number;
  cliente: string;
  monto: number;
  metodo: string;
  fecha: string;
  created_at: string;
}

export default function AdminPage() {
  const [tab, setTab] = useState<"reservas" | "pagos">("reservas");

  // Datos
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [cargando, setCargando] = useState(true);

  // Filtros
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");

  // Notificación flotante (Toast)
  const [notificacion, setNotificacion] = useState<{
    mensaje: string;
    tipo: "exito" | "error";
  } | null>(null);

  // Mostrar alerta temporal
  const mostrarNotificacion = (mensaje: string, tipo: "exito" | "error" = "exito") => {
    setNotificacion({ mensaje, tipo });
    setTimeout(() => setNotificacion(null), 3500);
  };

  // Cargar datos
  const cargarDatos = async () => {
    setCargando(true);
    try {
      const { data: resData, error: resErr } = await supabase
        .from("reservas")
        .select("*")
        .order("created_at", { ascending: false });

      const { data: pagData, error: pagErr } = await supabase
        .from("pagos")
        .select("*")
        .order("created_at", { ascending: false });

      if (resErr) console.error("Error al cargar reservas:", resErr.message);
      if (pagErr) console.error("Error al cargar pagos:", pagErr.message);

      if (resData) setReservas(resData as Reserva[]);
      if (pagData) setPagos(pagData as Pago[]);
    } catch (err) {
      console.error("Error de conexión:", err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Cambiar estado de una reserva
  const handleCambiarEstado = async (id: number, nuevoEstado: string) => {
    try {
      const { error } = await supabase
        .from("reservas")
        .update({ estado: nuevoEstado })
        .eq("id", id);

      if (error) {
        mostrarNotificacion(`Error al actualizar estado: ${error.message}`, "error");
      } else {
        setReservas((prev) =>
          prev.map((r) => (r.id === id ? { ...r, estado: nuevoEstado as any } : r))
        );
        mostrarNotificacion(`Reserva #${id} actualizada a "${nuevoEstado.toUpperCase()}"`);
      }
    } catch (err) {
      mostrarNotificacion("Error de conexión al actualizar", "error");
    }
  };

  // Función para descargar / imprimir el informe en PDF
  const handleDescargarPDF = () => {
    window.print();
  };

  // Filtrado dinámico
  const reservasFiltradas = reservas.filter((r) => {
    const coincideFecha = filtroFecha ? r.fecha === filtroFecha : true;
    const coincideEstado =
      filtroEstado === "todos" ? true : (r.estado || "pendiente") === filtroEstado;
    return coincideFecha && coincideEstado;
  });

  const pagosFiltrados = pagos.filter((p) =>
    filtroFecha ? p.fecha === filtroFecha : true
  );

  // Estadísticas rápidas
  const totalLitros = reservasFiltradas.reduce((acc, r) => acc + Number(r.litros || 0), 0);
  const totalIngresosReservas = reservasFiltradas.reduce((acc, r) => acc + Number(r.total || 0), 0);
  const totalCobradoPagos = pagosFiltrados.reduce((acc, p) => acc + Number(p.monto || 0), 0);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 print:bg-white print:p-0">
      {/* Encabezado especial para la impresión del PDF */}
      <div className="hidden print:block mb-6 text-center border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Camacho Store - Reporte Oficial</h1>
        <p className="text-xs text-gray-600">
          Generado el: {new Date().toLocaleDateString()} | Filtro de Fecha: {filtroFecha || "Todas"}
        </p>
      </div>

      {/* Notificación Flotante (Toast) */}
      {notificacion && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-lg border text-sm font-semibold transition-all transform translate-y-0 print:hidden ${
            notificacion.tipo === "exito"
              ? "bg-green-600 text-white border-green-700"
              : "bg-red-600 text-white border-red-700"
          }`}
        >
          {notificacion.tipo === "exito" ? "✅ " : "⚠️ "} {notificacion.mensaje}
        </div>
      )}

      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {/* Encabezado del Panel */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 print:shadow-none print:border-none print:p-0">
          <div>
            <h1 className="text-2xl font-black text-gray-800">Panel de Administración</h1>
            <p className="text-xs text-gray-500">Gestión de Camacho Store</p>
          </div>
          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={cargarDatos}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2"
            >
              🔄 Recargar
            </button>
            <button
              onClick={handleDescargarPDF}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
            >
              📄 Descargar PDF
            </button>
          </div>
        </div>

        {/* Resumen de Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-1">
            <span className="text-xs font-bold text-gray-400 uppercase">Litros Reservados</span>
            <span className="text-2xl font-black text-blue-600">{totalLitros} L</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-1">
            <span className="text-xs font-bold text-gray-400 uppercase">Total en Reservas</span>
            <span className="text-2xl font-black text-emerald-600">${totalIngresosReservas.toFixed(2)}</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-1">
            <span className="text-xs font-bold text-gray-400 uppercase">Total Cobrado (Pagos)</span>
            <span className="text-2xl font-black text-purple-600">${totalCobradoPagos.toFixed(2)}</span>
          </div>
        </div>

        {/* Pestañas y Filtros */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center print:hidden">
          {/* Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setTab("reservas")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                tab === "reservas" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
              }`}
            >
              📋 Reservas ({reservasFiltradas.length})
            </button>
            <button
              onClick={() => setTab("pagos")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                tab === "pagos" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
              }`}
            >
              💳 Pagos ({pagosFiltrados.length})
            </button>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <input
                type="date"
                value={filtroFecha}
                onChange={(e) => setFiltroFecha(e.target.value)}
                className="border border-gray-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {tab === "reservas" && (
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="border border-gray-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todos">Todos los Estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="entregado">Entregado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            )}

            {(filtroFecha || filtroEstado !== "todos") && (
              <button
                onClick={() => {
                  setFiltroFecha("");
                  setFiltroEstado("todos");
                }}
                className="text-xs text-red-500 font-bold hover:underline"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Tablas de Contenido */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden print:border-none print:shadow-none">
          {cargando ? (
            <div className="p-8 text-center text-sm font-semibold text-gray-500">
              Cargando información...
            </div>
          ) : tab === "reservas" ? (
            /* TABLA RESERVAS */
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 uppercase font-semibold border-b border-gray-100">
                    <th className="p-4">ID</th>
                    <th className="p-4">Cliente</th>
                    <th className="p-4">Litros</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Fecha Entrega</th>
                    <th className="p-4">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {reservasFiltradas.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-gray-400 font-medium">
                        No se encontraron reservas con los filtros seleccionados.
                      </td>
                    </tr>
                  ) : (
                    reservasFiltradas.map((r) => {
                      const est = r.estado || "pendiente";
                      return (
                        <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 font-bold text-gray-400">#{r.id}</td>
                          <td className="p-4 font-bold text-gray-800">{r.cliente}</td>
                          <td className="p-4 font-semibold">{r.litros} L</td>
                          <td className="p-4 font-bold text-emerald-600">${Number(r.total).toFixed(2)}</td>
                          <td className="p-4">{r.fecha}</td>
                          <td className="p-4">
                            <span className="hidden print:inline font-bold uppercase">{est}</span>
                            <select
                              value={est}
                              onChange={(e) => handleCambiarEstado(r.id, e.target.value)}
                              className={`print:hidden p-1.5 rounded-lg font-bold text-xs border border-transparent focus:outline-none cursor-pointer transition-colors ${
                                est === "pendiente"
                                  ? "bg-amber-100 text-amber-800"
                                  : est === "entregado"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-rose-100 text-rose-800"
                              }`}
                            >
                              <option value="pendiente">🟡 Pendiente</option>
                              <option value="entregado">🟢 Entregado</option>
                              <option value="cancelado">🔴 Cancelado</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            /* TABLA PAGOS */
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 uppercase font-semibold border-b border-gray-100">
                    <th className="p-4">ID</th>
                    <th className="p-4">Cliente</th>
                    <th className="p-4">Monto</th>
                    <th className="p-4">Método</th>
                    <th className="p-4">Fecha Pago</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {pagosFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-gray-400 font-medium">
                        No se encontraron pagos con los filtros seleccionados.
                      </td>
                    </tr>
                  ) : (
                    pagosFiltrados.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4 font-bold text-gray-400">#{p.id}</td>
                        <td className="p-4 font-bold text-gray-800">{p.cliente}</td>
                        <td className="p-4 font-bold text-purple-600">${Number(p.monto).toFixed(2)}</td>
                        <td className="p-4">
                          <span className="bg-gray-100 px-2 py-1 rounded text-gray-600 font-semibold">
                            {p.metodo}
                          </span>
                        </td>
                        <td className="p-4">{p.fecha}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
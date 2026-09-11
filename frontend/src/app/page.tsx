import { Resumen } from "../types";
import StatCard from "../components/StatCard";
import StockGauge from "../components/StockGauge";

export default async function Home() {
  const respuesta = await fetch("http://127.0.0.1:5000/api/reportes/resumen");
  const datos: Resumen = await respuesta.json();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Clientes" value={datos.total_clientes} color="bg-blue-50 text-blue-700" />
        <StatCard label="Pendientes" value={datos.reservas_pendientes} color="bg-amber-50 text-amber-700" />
        <StatCard label="Confirmadas" value={datos.reservas_confirmadas} color="bg-green-50 text-green-700" />
        <StatCard label="Ingresos" value={`$${datos.total_ingresos}`} color="bg-purple-50 text-purple-700" />
        <StatCard label="Stock" value={datos.total_stock} color="bg-cyan-50 text-cyan-700" />
        </div>
        <StockGauge actual={datos.total_stock} capacidad={1000} />
    </div>
  );
}
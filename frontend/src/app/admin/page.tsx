import { Resumen } from "../../types";
import StatCard from "../../components/StatCard";
import StockGauge from "../../components/StockGauge";
import QrDescarga from "../../components/QrDescarga";
import { Reserva } from "../../types";
import OrdenRow from "../../components/OrdenRow";



export default async function Home() {
  const respuesta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reportes/resumen`);
  const datos: Resumen = await respuesta.json();

  const respuestaReservas = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reservas`);
  const todasReservas: Reserva[] = await respuestaReservas.json();
  const recientes = [...todasReservas].sort((a, b) => b.id - a.id).slice(0, 3);

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
      <QrDescarga />
      <div className="bg-white rounded-xl p-4 border border-gray-100 mt-3">
        <p className="text-sm font-medium text-gray-600 mb-2">Órdenes recientes</p>
        {recientes.map((reserva) => (
          <OrdenRow key={reserva.id} reserva={reserva} />
        ))}
      </div>
    </div>


  );
}
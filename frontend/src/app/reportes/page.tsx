import { Resumen } from "../../types";
import StatCard from "../../components/StatCard";
import DescargarPdfBoton from "../../components/reportes/DescargarPdfBoton";

export default async function Reportes() {
 const respuesta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reportes/resumen`);
 const datos: Resumen = await respuesta.json();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Reportes</h1>
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Clientes" value={datos.total_clientes} color="bg-blue-50 text-blue-700" />
        <StatCard label="Pendientes" value={datos.reservas_pendientes} color="bg-amber-50 text-amber-700" />
        <StatCard label="Confirmadas" value={datos.reservas_confirmadas} color="bg-green-50 text-green-700" />
        <StatCard label="Ingresos" value={`$${datos.total_ingresos}`} color="bg-purple-50 text-purple-700" />
      </div>
      <div className="mt-3">
        <DescargarPdfBoton />
      </div>
    </div>
  );
}
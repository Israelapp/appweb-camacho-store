import { Resumen } from "../../types";
import DescargarPdfBoton from "../../components/reportes/DescargarPdfBoton";

export default async function Reportes() {
  const respuesta = await fetch("http://127.0.0.1:5000/api/reportes/resumen");
  const datos: Resumen = await respuesta.json();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 p-4 pb-0">Reportes</h1>
        <p>Total de clientes: {datos.total_clientes}</p>
        <p>Reservas pendientes: {datos.reservas_pendientes}</p>
        <p>Reservas confirmadas: {datos.reservas_confirmadas}</p>
        <p>Total de ingresos: {datos.total_ingresos}</p>
          
          <DescargarPdfBoton />
          
    </div>
  );
}
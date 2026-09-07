import { Resumen } from "../../types";

export default async function Reportes() {
  const respuesta = await fetch("http://127.0.0.1:5000/api/reportes/resumen");
  const datos: Resumen = await respuesta.json();

  return (
    <div>
        <p>Total de clientes: {datos.total_clientes}</p>
        <p>Reservas pendientes: {datos.reservas_pendientes}</p>
        <p>Reservas confirmadas: {datos.reservas_confirmadas}</p>
        <p>Total de ingresos: {datos.total_ingresos}</p>
    </div>
  );
}
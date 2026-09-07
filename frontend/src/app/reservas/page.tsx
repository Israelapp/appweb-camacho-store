import { Reserva } from "../../types";
import ReservaCard from "../../components/reservas/ReservaCard";
import ReservaForm from "../../components/reservas/ReservaForm";

export default async function ReservaPage() {
  const respuesta = await fetch("http://127.0.0.1:5000/api/reservas");
  const datos: Reserva[] = await respuesta.json();

  return (
    <div>
      <ReservaForm />

      {datos.map((reserva: Reserva) => (
        <ReservaCard
          key={reserva.id}
          reserva={reserva}
        />
      ))}
    </div>
  );
}
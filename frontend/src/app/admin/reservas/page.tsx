import { Reserva } from "../../../types";
import ReservaCard from "../../../components/reservas/ReservaCard";
import ReservaForm from "../../../components/reservas/ReservaForm";

export default async function ReservaPage() {
  const respuesta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reservas`);
  const datos: Reserva[] = await respuesta.json();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 p-4 pb-0">Reservas</h1>
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
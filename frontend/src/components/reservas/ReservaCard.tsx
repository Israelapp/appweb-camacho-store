import { Reserva } from "../../types";

export default function ReservaCard({ reserva }: { reserva: Reserva }) {
  let colorEstado = "bg-gray-100 text-gray-700";

  if (reserva.estado === "pendiente") {
    colorEstado = "bg-amber-100 text-amber-700";
  }
  if (reserva.estado === "confirmada") {
    colorEstado = "bg-green-100 text-green-700";
  }
  if (reserva.estado === "cancelada") {
    colorEstado = "bg-red-100 text-red-700";
  }

  return (
    <div className="bg-white p-4 m-2 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold text-gray-800">{reserva.cliente}</p>
        <span className={`text-xs px-2 py-1 rounded-full ${colorEstado}`}>
          {reserva.estado}
        </span>
      </div>
      <p className="text-sm text-gray-600">Litros: {reserva.litros}</p>
    </div>
  );
}
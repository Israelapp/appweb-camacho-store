import { Reserva } from "../types";

export default function OrdenRow({ reserva }: { reserva: Reserva }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
      <div>
        <p className="font-medium text-gray-800">{reserva.cliente}</p>
        <p className="text-xs text-gray-500">{reserva.litros}L</p>
      </div>
      <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">
        {reserva.estado}
      </span>
    </div>
  );
}
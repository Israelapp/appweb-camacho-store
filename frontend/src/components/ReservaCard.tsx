import { Reserva } from "../types";

export default function ReservaCard({ reserva }: { reserva: Reserva }) {
  return (
    <div className="bg-white text-gray-800 p-4 m-2 rounded shadow">
      <p><strong>Cliente:</strong> {reserva.cliente} </p> 
      <p><strong>Litros:</strong> {reserva.litros} </p> 
      <p><strong>Estado:</strong> {reserva.estado} </p> 
      <p><strong>ID:</strong> {reserva.id} </p>
    </div>
    
  );
}


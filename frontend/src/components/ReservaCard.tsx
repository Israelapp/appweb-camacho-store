import { Reserva } from "../types";

export default function ReservaCard({ reserva }: { reserva: Reserva }) {
  return (
    <div>
      <p>{reserva.cliente} </p> 
      <p>{reserva.litros} </p> 
      <p>{reserva.estado} </p> 
      <p>{reserva.id} </p>

    </div>
    
  );
}
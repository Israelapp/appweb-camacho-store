import { Reserva } from "../types";
import ReservaCard from "../components/ReservaCard";



export default async function Home(){ 

    const respuesta = await fetch("http://127.0.0.1:5000/api/reservas");
    const datos = await respuesta.json(); 
    console.log(datos)

    return (
    <div>
      {datos.map((reserva: Reserva) => (
        <ReservaCard key={reserva.id} reserva={reserva}  />
      ))}
    </div>
  );
  }
  
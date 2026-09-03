import {Cliente} from "../types";

export default function ClienteCard ({cliente} : {cliente: Cliente}) {
    return (
        <div className="bg-white text-gray-800 p-4 m-2 rounded shadow">
        <p> <strong>id: {cliente.id} </strong></p>
        <p><strong> nombre:</strong> {cliente.nombre}</p>
        <p> <strong>telefono: </strong>{cliente.telefono}</p>
        <p><strong>direccion: </strong>{cliente.direccion}</p>
        </div>
    
    );
}
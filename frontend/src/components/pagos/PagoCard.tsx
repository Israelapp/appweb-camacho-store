import {Pago} from "../../types"

export default function PagoCard ({pago}: {pago: Pago}) {
    return (

    <div className="bg-white text-gray-800 p-4 m-2 rounded shadow">
    <p><strong>Cliente:</strong> {pago.cliente} </p> 
    <p><strong>Monto:</strong> {pago.monto} </p> 
    <p><strong>Metodo:</strong> {pago.metodo} </p> 
    <p><strong>Fecha:</strong> {pago.fecha} </p>
    </div>

    );
}
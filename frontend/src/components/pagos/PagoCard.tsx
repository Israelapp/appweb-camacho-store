import {Pago} from "../../types"

export default function PagoCard ({pago}: {pago: Pago}) {
    return (

    <div className="bg-white p-4 m-2 rounded-xl shadow-sm border border-gray-200">
    <p className="font-semibold text-gray-800 mb-1"> {pago.cliente}</p>
    <div className="flex flex-col text-gray-600">
    <p><strong>Monto:</strong> {pago.monto} </p> 
    <p><strong>Metodo:</strong> {pago.metodo} </p> 
    <p><strong>Fecha:</strong> {pago.fecha} </p>
    </div>
        </div> 
    );
}
import { Cliente } from "../../types";

export default function ClienteCard({ cliente }: { cliente: Cliente }) {
    return (
        <div className="bg-white p-4 m-2 rounded-xl shadow-sm border border-gray-100">

            <p className="font-semibold text-gray-800 mb-1">{cliente.nombre}</p>
            <div className="flex flex-col text-sm text-gray-600">
                <span>Tel: {cliente.telefono}</span>
                <span>{cliente.direccion}</span>
            </div>
        </div>
    );
}
import { Producto } from "../../types";

export default function ProductoCard({ producto }: { producto: Producto }) {
  return (
    <div className="bg-white p-4 m-2 rounded-xl shadow-sm border border-gray-100">
      <p className="font-semibold text-gray-800 mb-1">{producto.nombre}</p>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Cantidad: {producto.cantidad}</span>
        <span>Precio: ${producto.precio}</span>
      </div>
    </div>
  );
}
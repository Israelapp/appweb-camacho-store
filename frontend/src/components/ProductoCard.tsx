import { Producto } from "../types";

export default function ProductoCard({ producto }: { producto: Producto }) {
  return (
    <div className="bg-white text-gray-800 p-4 m-2 rounded shadow">
      <p><strong>id:</strong> {producto.id} </p> 
      <p><strong>nombre:</strong> {producto.nombre} </p> 
      <p><strong>cantidad:</strong> {producto.cantidad} </p>
      <p> <strong>precio:</strong> {producto.precio} </p>
    </div>
    
  );
}
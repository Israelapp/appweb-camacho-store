import { Producto } from "../../types"
import ProductoForm from "../../components/inventario/ProductoForm";
import ProductoCard from "../../components/inventario/ProductoCard";


export default async function Inventario() {

    const respuesta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/inventario`);
    const datos = await respuesta.json();
    console.log(datos);

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 p-4 pb-0">Inventario</h1>
            <ProductoForm/>
            {datos.map((producto: Producto) => (
                <ProductoCard key={producto.id} producto={producto} />
            ))}
        </div>
    );
}

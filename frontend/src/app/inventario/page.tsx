import  { Producto } from "../../types";
import ProductoCard from "../../components/ProductoCard";

export default async function Inventario() {

    const respuesta = await fetch("http://127.0.0.1:5000/api/inventario");
    const datos = await respuesta.json();
    console.log(datos);

    return (
        <div>
            {datos.map((producto: Producto) => (
                <ProductoCard key={producto.id} producto={producto} />
            ))}
        </div>
    );
}

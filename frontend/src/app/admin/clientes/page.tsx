import { Cliente } from "../../../types";
import ClienteForm from "../../../components/clientes/ClienteForm"
import ClienteCard from "../../../components/clientes/ClienteCard"

export default async function clientesPage () {

    const respuesta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clientes`);
    const datos = await respuesta.json();
    console.log(datos);

    return(

    <div> 
        <h1 className="text-2xl font-bold text-gray-800 p-4 pb-0">Clientes</h1>
        <ClienteForm/>
         {datos.map((cliente: Cliente) =>  (
            <ClienteCard key={cliente.id} cliente={cliente} />
            ))} 
        </div>
    )


}


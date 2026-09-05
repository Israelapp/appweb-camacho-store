import { Cliente } from "../../types";
import ClienteForm from "../../components/ClienteForm"
import ClienteCard from "../../components/ClienteCard";

export default async function clientesPage () {

    const respuesta = await fetch("http://127.0.0.1:5000/api/cliente");
    const datos = await respuesta.json();
    console.log(datos);

    return(

    <div> 
        <ClienteForm/>
         {datos.map((cliente: Cliente) =>  (
            <ClienteCard key={cliente.id} cliente ={cliente} />
            ))} 
        </div>
    )


}


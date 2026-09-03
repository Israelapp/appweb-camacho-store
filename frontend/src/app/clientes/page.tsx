import { Cliente } from "../../types"
import Clientefrom from "../../components/ClienteForm"
import ClienteCard from "../../components/ClienteCard";

export default async function Cliente () {

    const respuesta = await fetch("http://127.0.0.1:5000/api/clientes");
    const datos = await respuesta.json();
    console.log(datos);

    return(

        <div></div>
    )


}